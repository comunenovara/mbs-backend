import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MbsMainModule } from './mbs-main/mbs-main.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		MbsMainModule,
	],
})
export class AppModule { }
