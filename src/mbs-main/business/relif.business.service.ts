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
		return this.relifEntityService.deleteRelif(id);
	}
}