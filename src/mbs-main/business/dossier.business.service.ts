import { Injectable } from "@nestjs/common";
import { DossierDto } from "../dto/dossier.dto";
import { DossierEntityService } from "../entity/dossier.entity.service";

@Injectable({})
export class DossierBusinessService {
	constructor(
		private dossierEntityService: DossierEntityService,
	) {}

	async createDossier(dossierDto: DossierDto) {
		return this.dossierEntityService.insertDossier(dossierDto);
	}

	async editDossier(dossierDto: DossierDto) {
		return this.dossierEntityService.updateDossier(dossierDto);
	}

	async searchDossiers(filter: any): Promise<DossierDto[]> {
		return this.dossierEntityService.getDossiers(filter);
	}

	// Count
	async countDossiers(filter: any): Promise<number> {
		return this.dossierEntityService.countDossiers(filter);
	}

	async getDossier(id: number): Promise<DossierDto> {
		return this.dossierEntityService.getDossier(id);
	}

	async deleteDossier(id: number) {
		return this.dossierEntityService.deleteDossier(id);
	}
}