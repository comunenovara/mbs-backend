import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { AssetDto } from "src/mbs-main/dto/asset.dto";
import { DossierDto } from "src/mbs-main/dto/dossier.dto";
import { OperationDto } from "src/mbs-main/dto/operation.dto";
import { RelifDto } from "src/mbs-main/dto/relif.dto";
import { DossierEntityService } from "src/mbs-main/entity/dossier.entity.service";
import { PathsService } from "./paths.service";

@Injectable({})
export class DossierFileService {

	constructor(
		private pathsService: PathsService,
		private dossierEntityService: DossierEntityService,
	) { }

	private async createDossiers(entity: AssetDto | RelifDto | OperationDto) {
		let createdDossiers = [];
		let filter;
		{
			if(entity) { // TODO 

			}
			filter = { assetIdEquals: entity.id };
		}
		let dossiers: DossierDto[] = await this.dossierEntityService.getDossiers(filter);
		for (let dossier of dossiers) {
			createdDossiers.push(this.createDossier(dossier));
		}
		return createdDossiers;
	}

	createDossier(dossier: DossierDto) {
		let path: string = `${this.pathsService.getDossierFolderPath(dossier)}`;
		fs.mkdirSync(path);
		return path;
	}

	async createAssetDossiers(asset: AssetDto) {
		let createdDossiers = [];
		let dossiers: DossierDto[] = await this.dossierEntityService.getDossiers({ assetIdEquals: asset.id });
		for (let dossier of dossiers) {
			createdDossiers.push(this.createDossier(dossier));
		}
		return createdDossiers;
	}

	async createRelifDossiers(relif: RelifDto) {
		let createdDossiers = [];
		let dossiers: DossierDto[] = await this.dossierEntityService.getDossiers({ relifIdEquals: relif.id });
		for (let dossier of dossiers) {
			createdDossiers.push(this.createDossier(dossier));
		}
		return createdDossiers;
	}

	async createOperationDossiers(operation: OperationDto) {
		let createdDossiers = [];
		let dossiers: DossierDto[] = await this.dossierEntityService.getDossiers({ operationIdEquals: operation.id });
		for (let dossier of dossiers) {
			createdDossiers.push(this.createDossier(dossier));
		}
		return createdDossiers;
	}

	
}