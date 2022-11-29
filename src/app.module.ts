import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MbsModule } from './mbs/mbs.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		MbsModule,
	],
})
export class AppModule { }
