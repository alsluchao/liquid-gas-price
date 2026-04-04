import { Injectable } from '@nestjs/common';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { CreateGasLiquidDto, UpdateGasLiquidDto, QueryGasLiquidDto, StatisticsDto } from './dto/gas-liquid.dto';
import * as XLSX from 'xlsx';

@Injectable()
export class GasLiquidService {
  async create(dto: CreateGasLiquidDto, userId?: string) {
    const client = getSupabaseClient();
    const amount = Number((dto.quantity * dto.unit_price).toFixed(2));
    
    const { data, error } = await client
      .from('gas_liquid_records')
      .insert({
        ...dto,
        amount,
        user_id: userId || null,
      })
      .select()
      .single();

    if (error) throw new Error(`创建记录失败: ${error.message}`);
    return data;
  }

  async findAll(query: QueryGasLiquidDto) {
    const client = getSupabaseClient();
    let queryBuilder = client
      .from('gas_liquid_records')
      .select('*')
      .order('date', { ascending: false });

    if (query.start_date) {
      queryBuilder = queryBuilder.gte('date', query.start_date);
    }
    if (query.end_date) {
      queryBuilder = queryBuilder.lte('date', query.end_date);
    }
    if (query.category) {
      queryBuilder = queryBuilder.eq('category', query.category);
    }
    if (query.type) {
      queryBuilder = queryBuilder.eq('type', query.type);
    }

    const { data, error } = await queryBuilder;
    if (error) throw new Error(`查询记录失败: ${error.message}`);
    return data;
  }

  async findOne(id: number) {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('gas_liquid_records')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(`查询记录失败: ${error.message}`);
    return data;
  }

  async update(id: number, dto: UpdateGasLiquidDto) {
    const client = getSupabaseClient();
    const updateData: any = { ...dto };
    
    if (dto.quantity !== undefined || dto.unit_price !== undefined) {
      const record = await this.findOne(id);
      if (!record) throw new Error('记录不存在');
      
      const quantity = dto.quantity !== undefined ? dto.quantity : Number(record.quantity);
      const unitPrice = dto.unit_price !== undefined ? dto.unit_price : Number(record.unit_price);
      updateData.amount = Number((quantity * unitPrice).toFixed(2));
    }

    const { data, error } = await client
      .from('gas_liquid_records')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`更新记录失败: ${error.message}`);
    return data;
  }

  async remove(id: number) {
    const client = getSupabaseClient();
    const { error } = await client
      .from('gas_liquid_records')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`删除记录失败: ${error.message}`);
    return { message: '删除成功' };
  }

  async getStatistics(query: QueryGasLiquidDto): Promise<StatisticsDto> {
    const records = await this.findAll(query);
    
    const stats = records.reduce(
      (acc, record) => {
        const amount = Number(record.amount);
        const quantity = Number(record.quantity);
        
        if (record.type === '进货') {
          acc.total_in += amount;
          acc.total_in_quantity += quantity;
        } else if (record.type === '出货') {
          acc.total_out += amount;
          acc.total_out_quantity += quantity;
        }
        return acc;
      },
      {
        total_in: 0,
        total_out: 0,
        profit: 0,
        total_in_quantity: 0,
        total_out_quantity: 0,
      },
    );

    stats.profit = Number((stats.total_out - stats.total_in).toFixed(2));
    stats.total_in = Number(stats.total_in.toFixed(2));
    stats.total_out = Number(stats.total_out.toFixed(2));

    return stats;
  }

  async exportExcel(query: QueryGasLiquidDto): Promise<Buffer> {
    const records = await this.findAll(query);
    
    const excelData = records.map((record, index) => ({
      '序号': index + 1,
      '日期': new Date(record.date).toLocaleDateString('zh-CN'),
      '类别': record.category,
      '类型': record.type,
      '数量': Number(record.quantity),
      '单价': Number(record.unit_price),
      '金额': Number(record.amount),
      '销货单位': record.sales_unit || '',
      '装车日期': record.loading_date ? new Date(record.loading_date).toLocaleDateString('zh-CN') : '',
      '车号': record.truck_number || '',
      '提货量(吨)': record.pickup_quantity ? Number(record.pickup_quantity) : '',
      '一票制总价': record.one_ticket_price ? Number(record.one_ticket_price) : '',
      '销售金额': record.sales_amount ? Number(record.sales_amount) : '',
      '液单价': record.liquid_unit_price ? Number(record.liquid_unit_price) : '',
      '服务费单价': record.service_fee_unit_price ? Number(record.service_fee_unit_price) : '',
      '付款日期': record.payment_date ? new Date(record.payment_date).toLocaleDateString('zh-CN') : '',
      '预付款金额': record.advance_payment ? Number(record.advance_payment) : '',
      '备注': record.remark || '',
      '创建时间': new Date(record.created_at).toLocaleString('zh-CN'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '液气进出记录');

    // 设置列宽
    worksheet['!cols'] = [
      { wch: 6 },  // 序号
      { wch: 12 }, // 日期
      { wch: 12 }, // 类别
      { wch: 8 },  // 类型
      { wch: 10 }, // 数量
      { wch: 10 }, // 单价
      { wch: 12 }, // 金额
      { wch: 20 }, // 销货单位
      { wch: 12 }, // 装车日期
      { wch: 12 }, // 车号
      { wch: 12 }, // 提货量
      { wch: 12 }, // 一票制总价
      { wch: 12 }, // 销售金额
      { wch: 10 }, // 液单价
      { wch: 12 }, // 服务费单价
      { wch: 12 }, // 付款日期
      { wch: 12 }, // 预付款金额
      { wch: 20 }, // 备注
      { wch: 20 }, // 创建时间
    ];

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    return buffer;
  }

  async getCategories(): Promise<string[]> {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('gas_liquid_records')
      .select('category');

    if (error) throw new Error(`查询类别失败: ${error.message}`);
    
    const categories = [...new Set(data.map(item => item.category))];
    return categories.sort();
  }
}
