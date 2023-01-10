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
import { FileManagerService } from './mbs/file-manager.service';
import { AssetFileService } from './mbs/file/asset.file.service';
import { DossierFileService } from './mbs/file/dossier.file.service';
import { RelifFileService } from './mbs/file/relif.file.service';
import { PathsService } from './mbs/file/paths.service';
import { OperationFileService } from './mbs/file/operation.file.service';
import { FileStructureCheckerService } from './mbs/file/structure-checker.service';

@Module({
	providers: [
		PrismaService,
		PathsService,
		
		AssetFileService,
		RelifFileService,
		OperationFileService,
		DossierFileService,

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

		FileManagerService,
		FileStructureCheckerService,
		
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
