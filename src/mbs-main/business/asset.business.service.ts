import { Injectable } from "@nestjs/common";
import { AssetDto } from "../dto/asset.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class AssetBusinessService {
	constructor(
		private prisma: PrismaService,
	) {}

	async addAsset(assetDto: AssetDto) {
		return await this.prisma.asset.create({
			data: {
				description: assetDto.description,
				address: assetDto.address,
				mq: assetDto.mq,
			},
		});
	}

	async editAsset(assetDto: AssetDto) {
		return await this.prisma.asset.update({
			where: {
				id: assetDto.id,
			},
			data: {
				description: assetDto.description,
				address: assetDto.address,
				mq: assetDto.mq,
			},
		});
	}

	// Search
	async getAssets(queryParams: any): Promise<AssetDto[]> {
		let prismaRequestArgs: any = {};
		// Pagination
		if(queryParams.size !== undefined && queryParams.page !== undefined) {
			prismaRequestArgs = { ...QueryParamsTools.getPrismaPaginationObject(queryParams) };
		}
		// Filter
		{

		}
		// Join
		{
		}
		// Order
		if(queryParams.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(queryParams);
		}
		return await this.prisma.asset.findMany(prismaRequestArgs);
	}

	// Count
	async countAssets(queryParams: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{

		}
		return await this.prisma.asset.count(prismaRequestArgs);
	}

	async getAsset(id: number): Promise<AssetDto> {
		return await this.prisma.asset.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteAsset(id: number) {
		return await this.prisma.asset.delete({
			where: {
				id: id,
			}
		});
	}
}