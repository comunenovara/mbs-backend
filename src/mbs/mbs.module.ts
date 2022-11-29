import { Module } from '@nestjs/common';
import { PrismaService } from './repository/prisma.service';
import { AssetBusinessService } from './business/asset.business.service';
import { AssetController } from './web/rest/asset.controller';

@Module({
	providers: [
		PrismaService,
		
		AssetBusinessService,
	],
	controllers: [
		AssetController,

	]
})
export class MbsModule { }
