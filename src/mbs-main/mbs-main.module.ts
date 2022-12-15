import { Module } from '@nestjs/common';
import { PrismaService } from './repository/prisma.service';

import { AssetBusinessService } from './business/asset.business.service';
import { AssetEntityService } from './entity/asset.entity.service';
import { AssetController } from './web/rest/asset.controller';
import { DossierBusinessService } from './business/dossier.business.service';
import { DossierEntityService } from './entity/dossier.entity.service';
import { DossierController } from './web/rest/dossier.controller';
import { DossierTypeBusinessService } from './business/dossier-type.business.service';
import { DossierTypeEntityService } from './entity/dossier-type.entity.service';
import { DossierTypeController } from './web/rest/dossier-type.controller';
import { OperationBusinessService } from './business/operation.business.service';
import { OperationEntityService } from './entity/operation.entity.service';
import { OperationController } from './web/rest/operation.controller';
import { OperationTypeBusinessService } from './business/operation-type.business.service';
import { OperationTypeEntityService } from './entity/operation-type.entity.service';
import { OperationTypeController } from './web/rest/operation-type.controller';
import { RelifBusinessService } from './business/relif.business.service';
import { RelifEntityService } from './entity/relif.entity.service';
import { RelifController } from './web/rest/relif.controller';

@Module({
	providers: [
		PrismaService,

		AssetBusinessService,
		AssetEntityService,
		DossierBusinessService,
		DossierEntityService,
		DossierTypeBusinessService,
		DossierTypeEntityService,
		OperationBusinessService,
		OperationEntityService,
		OperationTypeBusinessService,
		OperationTypeEntityService,
		RelifBusinessService,
		RelifEntityService,

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
