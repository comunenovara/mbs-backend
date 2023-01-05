import { Injectable } from "@nestjs/common";
import { AssetDto } from "../dto/asset.dto";
import { AssetEntityService } from "../entity/asset.entity.service";
import { FileOperationService } from "../mbs/file-operation.service";

@Injectable({})
export class AssetBusinessService {
	constructor(
		private assetEntityService: AssetEntityService,
		private fileOperationService: FileOperationService,
	) { }

	async createAsset(assetDto: AssetDto) {
		let asset: AssetDto = await this.assetEntityService.insertAsset(assetDto);
		{
			this.fileOperationService.createAssetFolder(asset);
		}
		return asset;
	}

	async editAsset(assetDto: AssetDto) {
		return this.assetEntityService.updateAsset(assetDto);
	}

	async searchAssets(filters: any = {}): Promise<AssetDto[]> {
		return this.assetEntityService.getAssets(filters);
	}

	async countAssets(filters: any): Promise<number> {
		return this.assetEntityService.countAssets(filters);
	}

	async getAsset(id: number): Promise<AssetDto> {
		return this.assetEntityService.getAsset(id);
	}

	async deleteAsset(id: number) {
		let asset: AssetDto = await this.getAsset(id);
		this.fileOperationService.deleteAssetFolder(asset);
		return this.assetEntityService.deleteAsset(id);
	}
}