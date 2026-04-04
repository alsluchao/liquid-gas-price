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
