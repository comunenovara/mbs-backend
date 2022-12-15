import { Injectable } from "@nestjs/common";
import { AssetDto } from "../dto/asset.dto";
import { AssetEntityService } from "../entity/asset.entity.service";

@Injectable({})
export class AssetBusinessService {
	constructor(
		private assetEntityService: AssetEntityService,
	) {}

	async createAsset(assetDto: AssetDto) {
		return this.assetEntityService.insertAsset(assetDto);
	}

	async editAsset(assetDto: AssetDto) {
		return this.assetEntityService.updateAsset(assetDto);
	}

	async searchAssets(filters: any): Promise<AssetDto[]> {
		return this.assetEntityService.getAssets(filters);
	}

	async countAssets(filters: any): Promise<number> {
		return this.assetEntityService.countAssets(filters);
	}

	async getAsset(id: number): Promise<AssetDto> {
		return this.assetEntityService.getAsset(id);
	}

	async deleteAsset(id: number) {
		return this.assetEntityService.deleteAsset(id);
	}
}