import { Module } from '@nestjs/common';
import { EntitiesModule } from 'src/entities/entities.module';
import { CubicleController } from './cubicle.controller';

@Module({
  imports: [
    EntitiesModule
  ],
  controllers: [CubicleController]
})
export class CubicleModule {}
