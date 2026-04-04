import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { GasLiquidModule } from './gas-liquid/gas-liquid.module';

@Module({
  imports: [GasLiquidModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
