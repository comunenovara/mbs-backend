import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { join } from "path";
import { MBS_FOLDER_PATH } from "src/mbs-main/constants";
import { AssetDto } from "src/mbs-main/dto/asset.dto";
import { RelifDto } from "src/mbs-main/dto/relif.dto";
import { RelifEntityService } from "src/mbs-main/entity/relif.entity.service";
import { ElementCategory, ElementDirType, ElementFileType } from "../class/element.class";
import { RELIF_DIR } from "../structure.costants";
import { DossierFileService } from "./dossier.file.service";
import { PathsService } from "./paths.service";

@Injectable({})
export class RelifFileService {

	constructor(
		private pathsService: PathsService,
		private relifEntityService: RelifEntityService,
		private dossierFileService: DossierFileService,
	) { }

	async createRelifsFolder(asset: AssetDto) {
		let path = this.pathsService.getRelifsFolderPath(asset);
		fs.mkdirSync(path);
		let created = await this.createRelifs(asset)
		created.push(path);
		return created;
	}

	async createRelifs(asset: AssetDto) {
		let createdRelifs = [];
		let relifs: RelifDto[] = await this.relifEntityService.getRelifs({ assetIdEquals: asset.id });
		for (let relif of relifs) {
			createdRelifs.push(await this.createRelif(relif));
		}
		return createdRelifs;
	}

	async createRelif(relif: RelifDto) {
		let path = `${this.pathsService.getRelifFolderPath(relif)}`;
		fs.mkdirSync(path);
		let createdChilds = await this.createRelifChilds(relif);
		createdChilds.push(path)
		return createdChilds;
	}

	async createRelifChilds(relif: RelifDto) {
		let created = [];
		for (let elementKey in RELIF_DIR) {
			let element = RELIF_DIR[elementKey];
			switch (element.category) {
				case ElementCategory.dir: {
					switch (element.type) {
						case ElementDirType.dossier:	created.push(await this.dossierFileService.createRelifDossiers(relif)); break;
					}
				} break;
				case ElementCategory.file: {
					switch (element.type) {
						case ElementFileType.generic: 	console.log("File mancante:", elementKey, ". Invia mail di warning!"); break;
						case ElementFileType.link: 		created.push(this.createRelifLinkFile(relif)); break;
						case ElementFileType.base: 		created.push(this.createRelifBaseFile(relif)); break;
					}
				} break;
			}
		}
		return created;
	}

	deleteRelifFolder(relif: RelifDto) {
		fs.rmSync(this.pathsService.getRelifFolderPath(relif), { recursive: true });
	}

	private createRelifBaseFile(relif: RelifDto) {
		let path = join(this.pathsService.getRelifFolderPath(relif), 'base_p0.dwg NO');
		return path;
	}

	private createRelifLinkFile(relif: RelifDto) {
		let fileContent = `[InternetShortcut]
		IDList=
		URL=http://localhost:3000/enzo/relif/detail/${relif.id}/`;

		let path = join(`${this.pathsService.getRelifFolderPath(relif)}`, 'Dettagli.url');
		fs.writeFileSync(path, fileContent, {
			flag: 'w',
		});
		return path;
	}

	
}