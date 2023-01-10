import { Injectable } from "@nestjs/common";
import { AssetDto } from "../dto/asset.dto";
import { AssetEntityService } from "../entity/asset.entity.service";
import { AssetFileService } from "../mbs/file/asset.file.service";

@Injectable({})
export class AssetBusinessService {
	constructor(
		private assetEntityService: AssetEntityService,
		private assetFileService: AssetFileService,
	) { }

	async createAsset(assetDto: AssetDto) {
		let asset: AssetDto = await this.assetEntityService.insertAsset(assetDto);
		this.assetFileService.createAsset(asset);
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
		try {
			this.assetFileService.deleteAssetFolder(asset);	
		} catch (error) {
			console.log("errore nella cancellazione della cartella");
		}
		return this.assetEntityService.deleteAsset(id);
	}	
}