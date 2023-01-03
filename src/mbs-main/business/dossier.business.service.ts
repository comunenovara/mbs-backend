import { BadRequestException, Injectable } from "@nestjs/common";
import { DossierDto } from "../dto/dossier.dto";
import { DossierEntityService } from "../entity/dossier.entity.service";

@Injectable({})
export class DossierBusinessService {
	constructor(
		private dossierEntityService: DossierEntityService,
	) {}

	async createDossier(dossierDto: DossierDto) {
		if(
			(dossierDto.assetId != null && dossierDto.operationId != null)
			||
			(dossierDto.assetId != null && dossierDto.relifId != null)
			||
			(dossierDto.operationId != null && dossierDto.relifId != null)
		) {
			throw new BadRequestException("Dossier is possible to associate only to one of this: Asset, Operation, Relif");
		}
		return this.dossierEntityService.insertDossier(dossierDto);
	}

	async editDossier(dossierDto: DossierDto) {
		return this.dossierEntityService.updateDossier(dossierDto);
	}

	async searchDossiers(filters: any): Promise<DossierDto[]> {
		return this.dossierEntityService.getDossiers(filters);
	}

	async countDossiers(filters: any): Promise<number> {
		return this.dossierEntityService.countDossiers(filters);
	}

	async getDossier(id: number): Promise<DossierDto> {
		return this.dossierEntityService.getDossier(id);
	}

	async deleteDossier(id: number) {
		return this.dossierEntityService.deleteDossier(id);
	}
}