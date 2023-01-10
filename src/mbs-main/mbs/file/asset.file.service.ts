import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { join } from "path";
import { MBS_FOLDER_PATH } from "src/mbs-main/constants";
import { AssetDto } from "src/mbs-main/dto/asset.dto";
import { AssetEntityService } from "src/mbs-main/entity/asset.entity.service";
import { ElementCategory, ElementDirType, ElementFileType } from "../class/element.class";
import { ASSET_DIR } from "../structure.costants";
import { DossierFileService } from "./dossier.file.service";
import { OperationFileService } from "./operation.file.service";
import { PathsService } from "./paths.service";
import { RelifFileService } from "./relif.file.service";

@Injectable({})
export class AssetFileService {

	constructor(
		private pathsService: PathsService,
		private assetEntityService: AssetEntityService,
		private relifFileService: RelifFileService,
		private operationFileService: OperationFileService,
		private dossierFileService: DossierFileService,
	) { }

	async createAssets() {
		let createdAssets = [];
		let assets: AssetDto[] = await this.assetEntityService.getAssets();
		for (let asset of assets) {
			createdAssets.push(await this.createAsset(asset));
		}
		return createdAssets;
	}

	async createAsset(asset: AssetDto) {
		let path = this.pathsService.getAssetFolderPath(asset)
		fs.mkdirSync(path);
		let createdChilds = await this.createAssetChilds(asset);
		createdChilds.push(path)
		return createdChilds;
	}

	async createAssetChilds(asset: AssetDto) {
		let created = [];
		for (let elementKey in ASSET_DIR) {
			let element = ASSET_DIR[elementKey];
			switch (element.category) {
				case ElementCategory.dir: {
					switch (element.type) {
						case ElementDirType.dossier:	created.push(await this.dossierFileService.createAssetDossiers(asset)); break;
						case ElementDirType.relifs:		created.push(await this.relifFileService.createRelifsFolder(asset)); break;
						case ElementDirType.operations:	created.push(await this.operationFileService.createOperationsFolder(asset)); break;
					}
				} break;
				case ElementCategory.file: {
					switch (element.type) {
						case ElementFileType.generic: 	console.log("File mancante:", elementKey, ". Invia mail di warning!"); break;
						case ElementFileType.link: 		created.push(this.createAssetLinkFile(asset)); break;
						case ElementFileType.base: 		created.push(this.createAssetBaseFile(asset)); break;
					}
				} break;
			}
		}
		return created;
	}

	createAssetBaseFile(asset: AssetDto) {
		let path = join(`${MBS_FOLDER_PATH}/${asset.id}_ ${asset.description}`, 'base_p0.dwg NO');
		return path;
	}

	createAssetLinkFile(asset: AssetDto) {
		let fileContent = `[InternetShortcut]
		IDList=
		URL=http://localhost:3000/enzo/asset/detail/${asset.id}`;

		let path = join(`${MBS_FOLDER_PATH}/${asset.id}_ ${asset.description}`, 'Dettagli.url');
		fs.writeFileSync(path, fileContent, {
			flag: 'w',
		});
		return path;
	}



	deleteAssetFolder(asset: AssetDto) {
		let folderPath = `${MBS_FOLDER_PATH}/${asset.id}_ ${asset.description}`;
		fs.rmSync(folderPath, { recursive: true });
	}
}