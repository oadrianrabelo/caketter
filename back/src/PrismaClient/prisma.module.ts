/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { DataService } from './prisma.service';

@Global()
@Module({ providers: [DataService], exports: [DataService] })
export class DataModule {}
