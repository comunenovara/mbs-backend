import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { AssetDto } from '../dto/asset.dto';
import { OperationDto } from '../dto/operation.dto';
import { RelifDto } from '../dto/relif.dto';
import { MBS_FOLDER_PATH } from '../constants';
import { ASSET_DIR } from './structure.costants';
import { ElementCategory, ElementDirType } from './class/element.class';

@Injectable({})
export class FileOperationService {
	createAssetFolder(asset: AssetDto) {
		let folderPath = `${MBS_FOLDER_PATH}/${asset.id}_ ${asset.description}`;
		fs.mkdirSync(folderPath);

		for (let elementKey in ASSET_DIR) {
			let element = ASSET_DIR[elementKey];
			switch (element.category) {
				case ElementCategory.dir: {
					switch (element.type) {
						case ElementDirType.dossier:	this.createDossiers(asset); break;
						case ElementDirType.relifs:		this.createRelifsFolder(asset); break;
						case ElementDirType.operations:	this.createOperationsFolder(asset); break;
					}
				} break;
				case ElementCategory.file: {
					console.log("Crea file", elementKey, element);
				} break;
			}
		}
	}

	createDossiers(asset: AssetDto) {
		// crea le cartelle dei dossier
	}

	createRelifsFolder(asset: AssetDto) {
		let folderPath = `${MBS_FOLDER_PATH}/${asset.id}_ ${asset.description}/_ Rilievi`;
		fs.mkdirSync(folderPath);
		// crea le cartelle dei relif
	}

	createRelifFolder(relif: RelifDto) {
		let folderPath = `${MBS_FOLDER_PATH}/${relif.asset.id}_ ${relif.asset.description}/_ Rilievi/r${relif.id}_ ${relif.description}`;
		fs.mkdirSync(folderPath);

		// crea i file dell'relif
	}

	createOperationsFolder(asset: AssetDto) {
		let folderPath = `${MBS_FOLDER_PATH}/${asset.id}_ ${asset.description}/_ Interventi`;
		fs.mkdirSync(folderPath);
		// crea le cartelle delle operation
	}

	createOperationFolder(operation: OperationDto) {
		let folderPath = `${MBS_FOLDER_PATH}/${operation.asset.id}_ ${operation.asset.description}/_ Interventi/r${operation.id}_ ${operation.description}`;
		fs.mkdirSync(folderPath);
		// crea i file dell'operation
	}



	deleteAssetFolder(asset: AssetDto) {
		let folderPath = `${MBS_FOLDER_PATH}/${asset.id}_ ${asset.description}`;
		fs.rmSync(folderPath, { recursive: true });
	}
}