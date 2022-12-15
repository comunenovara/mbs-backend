import { Injectable } from "@nestjs/common";
import { DossierTypeDto } from "../dto/dossier-type.dto";
import { DossierTypeEntityService } from "../entity/dossier-type.entity.service";

@Injectable({})
export class DossierTypeBusinessService {
	constructor(
		private dossierTypeEntityService: DossierTypeEntityService,
	) {}

	async createDossierType(dossierTypeDto: DossierTypeDto) {
		return this.dossierTypeEntityService.insertDossierType(dossierTypeDto);
	}

	async editDossierType(dossierTypeDto: DossierTypeDto) {
		return this.dossierTypeEntityService.updateDossierType(dossierTypeDto);
	}

	async searchDossierTypes(filters: any): Promise<DossierTypeDto[]> {
		return this.dossierTypeEntityService.getDossierTypes(filters);
	}

	async countDossierTypes(filters: any): Promise<number> {
		return this.dossierTypeEntityService.countDossierTypes(filters);
	}

	async getDossierType(id: number): Promise<DossierTypeDto> {
		return this.dossierTypeEntityService.getDossierType(id);
	}

	async deleteDossierType(id: number) {
		return this.dossierTypeEntityService.deleteDossierType(id);
	}
}