import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MbsMainModule } from './mbs-main/mbs-main.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		MbsMainModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'front'),
		}),
	],
})
export class AppModule { }
