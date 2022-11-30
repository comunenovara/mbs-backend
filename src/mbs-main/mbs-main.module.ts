import { Module } from '@nestjs/common';
import { PrismaService } from './repository/prisma.service';

import { AssetBusinessService } from './business/asset.business.service';
import { AssetController } from './web/rest/asset.controller';
import { DossierBusinessService } from './business/dossier.business.service';
import { DossierController } from './web/rest/dossier.controller';
import { DossierTypeBusinessService } from './business/dossier-type.business.service';
import { DossierTypeController } from './web/rest/dossier-type.controller';
import { OperationBusinessService } from './business/operation.business.service';
import { OperationController } from './web/rest/operation.controller';
import { OperationTypeBusinessService } from './business/operation-type.business.service';
import { OperationTypeController } from './web/rest/operation-type.controller';
import { RelifBusinessService } from './business/relif.business.service';
import { RelifController } from './web/rest/relif.controller';

@Module({
	providers: [
		PrismaService,

		AssetBusinessService,
		DossierBusinessService,
		DossierTypeBusinessService,
		OperationBusinessService,
		OperationTypeBusinessService,
		RelifBusinessService,

	],
	controllers: [
		AssetController,
		DossierController,
		DossierTypeController,
		OperationController,
		OperationTypeController,
		RelifController,

	]
})
export class MbsMainModule { }
