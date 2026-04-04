import { Controller, Get, Post, Put, Delete, Body, Param, Query, Res, ParseIntPipe } from '@nestjs/common';
import { Response } from 'express';
import { GasLiquidService } from './gas-liquid.service';
import { CreateGasLiquidDto, UpdateGasLiquidDto, QueryGasLiquidDto } from './dto/gas-liquid.dto';

@Controller('gas-liquid')
export class GasLiquidController {
  constructor(private readonly gasLiquidService: GasLiquidService) {}

  @Post()
  async create(@Body() dto: CreateGasLiquidDto) {
    console.log('[POST /api/gas-liquid] 创建记录:', dto);
    const result = await this.gasLiquidService.create(dto);
    console.log('[POST /api/gas-liquid] 创建成功:', result);
    return result;
  }

  @Get()
  async findAll(@Query() query: QueryGasLiquidDto) {
    console.log('[GET /api/gas-liquid] 查询记录:', query);
    const result = await this.gasLiquidService.findAll(query);
    console.log('[GET /api/gas-liquid] 查询成功，数量:', result.length);
    return result;
  }

  @Get('statistics')
  async getStatistics(@Query() query: QueryGasLiquidDto) {
    console.log('[GET /api/gas-liquid/statistics] 统计数据:', query);
    const result = await this.gasLiquidService.getStatistics(query);
    console.log('[GET /api/gas-liquid/statistics] 统计结果:', result);
    return result;
  }

  @Get('categories')
  async getCategories() {
    console.log('[GET /api/gas-liquid/categories] 查询类别');
    const result = await this.gasLiquidService.getCategories();
    console.log('[GET /api/gas-liquid/categories] 类别列表:', result);
    return result;
  }

  @Get('export')
  async exportExcel(@Query() query: QueryGasLiquidDto, @Res() res: Response) {
    console.log('[GET /api/gas-liquid/export] 导出Excel:', query);
    const buffer = await this.gasLiquidService.exportExcel(query);
    
    const filename = `液气进出记录_${new Date().toISOString().split('T')[0]}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
    res.send(buffer);
    console.log('[GET /api/gas-liquid/export] 导出成功:', filename);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('[GET /api/gas-liquid/:id] 查询记录:', id);
    const result = await this.gasLiquidService.findOne(id);
    console.log('[GET /api/gas-liquid/:id] 查询结果:', result);
    return result;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGasLiquidDto) {
    console.log('[PUT /api/gas-liquid/:id] 更新记录:', id, dto);
    const result = await this.gasLiquidService.update(id, dto);
    console.log('[PUT /api/gas-liquid/:id] 更新成功:', result);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    console.log('[DELETE /api/gas-liquid/:id] 删除记录:', id);
    const result = await this.gasLiquidService.remove(id);
    console.log('[DELETE /api/gas-liquid/:id] 删除成功:', result);
    return result;
  }
}
