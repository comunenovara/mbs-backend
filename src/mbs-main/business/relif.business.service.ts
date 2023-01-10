import { Injectable } from "@nestjs/common";
import { RelifDto } from "../dto/relif.dto";
import { RelifEntityService } from "../entity/relif.entity.service";
import { RelifFileService } from "../mbs/file/relif.file.service";

@Injectable({})
export class RelifBusinessService {
	constructor(
		private relifEntityService: RelifEntityService,
		private relifFileService: RelifFileService,
	) {}

	async createRelif(relifDto: RelifDto) {
		let relif: RelifDto = await this.relifEntityService.insertRelif(relifDto);
		this.relifFileService.createRelif(relif);
		return relif;
	}

	async editRelif(relifDto: RelifDto) {
		return this.relifEntityService.updateRelif(relifDto);
	}

	async searchRelifs(filters: any): Promise<RelifDto[]> {
		return this.relifEntityService.getRelifs(filters);
	}

	async countRelifs(filters: any): Promise<number> {
		return this.relifEntityService.countRelifs(filters);
	}

	async getRelif(id: number): Promise<RelifDto> {
		return this.relifEntityService.getRelif(id);
	}

	async deleteRelif(id: number) {
		let relif = await this.getRelif(id);
		try {
			this.relifFileService.deleteRelifFolder(relif);	
		} catch (error) {
			console.log("errore nella cancellazione della cartella");
		}
		return this.relifEntityService.deleteRelif(id);
	}
}