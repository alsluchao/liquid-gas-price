import { IsString, IsNumber, IsDateString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';

export enum RecordType {
  IN = '进货',
  OUT = '出货',
}

export class CreateGasLiquidDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsEnum(RecordType)
  @IsNotEmpty()
  type: RecordType;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unit_price: number;

  @IsString()
  @IsOptional()
  remark?: string;

  // 新增字段
  @IsString()
  @IsOptional()
  sales_unit?: string; // 销货单位

  @IsDateString()
  @IsOptional()
  loading_date?: string; // 装车日期

  @IsString()
  @IsOptional()
  truck_number?: string; // 车号

  @IsNumber()
  @IsOptional()
  pickup_quantity?: number; // 提货量（吨）

  @IsNumber()
  @IsOptional()
  one_ticket_price?: number; // 一票制总价

  @IsNumber()
  @IsOptional()
  sales_amount?: number; // 销售金额

  @IsNumber()
  @IsOptional()
  liquid_unit_price?: number; // 液单价

  @IsNumber()
  @IsOptional()
  service_fee_unit_price?: number; // 服务费单价

  @IsDateString()
  @IsOptional()
  payment_date?: string; // 付款日期

  @IsNumber()
  @IsOptional()
  advance_payment?: number; // 预付款金额
}

export class UpdateGasLiquidDto {
  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsEnum(RecordType)
  @IsOptional()
  type?: RecordType;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  unit_price?: number;

  @IsString()
  @IsOptional()
  remark?: string;

  // 新增字段
  @IsString()
  @IsOptional()
  sales_unit?: string;

  @IsDateString()
  @IsOptional()
  loading_date?: string;

  @IsString()
  @IsOptional()
  truck_number?: string;

  @IsNumber()
  @IsOptional()
  pickup_quantity?: number;

  @IsNumber()
  @IsOptional()
  one_ticket_price?: number;

  @IsNumber()
  @IsOptional()
  sales_amount?: number;

  @IsNumber()
  @IsOptional()
  liquid_unit_price?: number;

  @IsNumber()
  @IsOptional()
  service_fee_unit_price?: number;

  @IsDateString()
  @IsOptional()
  payment_date?: string;

  @IsNumber()
  @IsOptional()
  advance_payment?: number;
}

export class QueryGasLiquidDto {
  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsEnum(RecordType)
  @IsOptional()
  type?: RecordType;
}

export class StatisticsDto {
  total_in: number;
  total_out: number;
  profit: number;
  total_in_quantity: number;
  total_out_quantity: number;
}
