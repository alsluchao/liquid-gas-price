import { Module } from '@nestjs/common';
import { GasLiquidController } from './gas-liquid.controller';
import { GasLiquidService } from './gas-liquid.service';

@Module({
  controllers: [GasLiquidController],
  providers: [GasLiquidService],
  exports: [GasLiquidService],
})
export class GasLiquidModule {}
