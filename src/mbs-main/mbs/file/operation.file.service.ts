import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { join } from "path";
import { MBS_FOLDER_PATH } from "src/mbs-main/constants";
import { AssetDto } from "src/mbs-main/dto/asset.dto";
import { OperationDto } from "src/mbs-main/dto/operation.dto";
import { OperationEntityService } from "src/mbs-main/entity/operation.entity.service";
import { ElementCategory, ElementDirType, ElementFileType } from "../class/element.class";
import { RELIF_DIR } from "../structure.costants";
import { DossierFileService } from "./dossier.file.service";
import { PathsService } from "./paths.service";

@Injectable({})
export class OperationFileService {

	constructor(
		private pathsService: PathsService,
		private operationEntityService: OperationEntityService,
		private dossierFileService: DossierFileService,
	) { }

	async createOperationsFolder(asset: AssetDto) {
		let path = this.pathsService.getOperationsFolderPath(asset)
		fs.mkdirSync(path);
		let created = await this.createOperations(asset);
		created.push(path);
		return created;
	}

	async createOperations(asset: AssetDto) {
		let createdOperations = [];
		let operations: OperationDto[] = await this.operationEntityService.getOperations({ assetIdEquals: asset.id });
		for (let operation of operations) {
			createdOperations.push(await this.createOperation(operation));
		}
		return createdOperations;
	}

	async createOperation(operation: OperationDto) {
		let path = `${this.pathsService.getOperationFolderPath(operation)}`;
		fs.mkdirSync(path);
		let createdChilds = await this.createOperationChilds(operation);;
		createdChilds.push(path)
		return createdChilds;
	}

	async createOperationChilds(operation: OperationDto) {
		let created = [];
		for (let elementKey in RELIF_DIR) {
			let element = RELIF_DIR[elementKey];
			switch (element.category) {
				case ElementCategory.dir: {
					switch (element.type) {
						case ElementDirType.dossier:	created.push(await this.dossierFileService.createOperationDossiers(operation)); break;
					}
				} break;
				case ElementCategory.file: {
					switch (element.type) {
						case ElementFileType.generic: console.log("File mancante:", elementKey, ". Invia mail di warning!"); break;
						case ElementFileType.link: created.push(this.createOperationLinkFile(operation)); break;
						case ElementFileType.base: created.push(this.createOperationBaseFile(operation)); break;
					}
				} break;
			}
			return created;
		}
	}

	deleteOperationFolder(operation: OperationDto) {
		fs.rmSync(this.pathsService.getOperationFolderPath(operation), { recursive: true });
	}

	private createOperationLinkFile(operation: OperationDto) {
		//console.log("crea base file di:", asset.description);
	}

	private createOperationBaseFile(operation: OperationDto) {
		let fileContent = `[InternetShortcut]
		IDList=
		URL=http://localhost:3000/enzo/operation/detail/${operation.id}/`;

		fs.writeFileSync(join(`${this.pathsService.getOperationFolderPath(operation)}`, 'Dettagli.url'), fileContent, {
			flag: 'w',
		});
	}
}