import { BadRequestException, Injectable } from "@nestjs/common";
import { DossierDto } from "../dto/dossier.dto";
import { DossierEntityService } from "../entity/dossier.entity.service";
import { DossierFileService } from "../mbs/file/dossier.file.service";

@Injectable({})
export class DossierBusinessService {
	constructor(
		private dossierEntityService: DossierEntityService,
		private dossierFileService: DossierFileService,
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

		// Se asset controlla che il tipo di fasicolo non eista già

		// Se è un elaborato controllare che appartenga a gruppo di elaborati
		

		let dossier: DossierDto = await this.dossierEntityService.insertDossier(dossierDto);
		this.dossierFileService.createDossier(dossier);
		return dossier;
	}

	async editDossier(dossierDto: DossierDto) {
		return this.dossierEntityService.updateDossier(dossierDto);
	}

	async searchDossiers(filters: any = {}): Promise<DossierDto[]> {
		return this.dossierEntityService.getDossiers(filters);
	}

	async countDossiers(filters: any): Promise<number> {
		return this.dossierEntityService.countDossiers(filters);
	}

	async getDossier(id: number): Promise<DossierDto> {
		return this.dossierEntityService.getDossier(id);
	}

	async deleteDossier(id: number) {
		let dossier = await this.getDossier(id);
		try {
			this.dossierFileService.deleteDossierFolder(dossier);
		} catch (error) {
			console.log("errore nella cancellazione della cartella", error);
		}
		return this.dossierEntityService.deleteDossier(id);
	}
}