import { Injectable } from "@nestjs/common";
import { RelifDto } from "../dto/relif.dto";
import { RelifEntityService } from "../entity/relif.entity.service";

@Injectable({})
export class RelifBusinessService {
	constructor(
		private relifEntityService: RelifEntityService,
	) {}

	async createRelif(relifDto: RelifDto) {
		return this.relifEntityService.insertRelif(relifDto);
	}

	async editRelif(relifDto: RelifDto) {
		return this.relifEntityService.updateRelif(relifDto);
	}

	async searchRelifs(filter: any): Promise<RelifDto[]> {
		return this.relifEntityService.getRelifs(filter);
	}

	// Count
	async countRelifs(filter: any): Promise<number> {
		return this.relifEntityService.countRelifs(filter);
	}

	async getRelif(id: number): Promise<RelifDto> {
		return this.relifEntityService.getRelif(id);
	}

	async deleteRelif(id: number) {
		return this.relifEntityService.deleteRelif(id);
	}
}