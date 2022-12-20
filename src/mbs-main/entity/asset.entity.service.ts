import { Injectable } from "@nestjs/common";
import { AssetDto } from "../dto/asset.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class AssetEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertAsset(assetDto: AssetDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			description: assetDto.description,
			address: assetDto.address,
			mq: assetDto.mq,
		};
		// Relations
		return await this.prisma.asset.create(prismaRequestArgs);
	}

	async updateAsset(assetDto: AssetDto) {
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

	// Get
	async getAssets(filters: any): Promise<AssetDto[]> {
		let prismaRequestArgs: any = {};
		// Pagination
		if(filters.size !== undefined && filters.page !== undefined) {
			prismaRequestArgs = { ...QueryParamsTools.getPrismaPaginationObject(filters) };
		}
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		// Join
		{
		}
		// Order
		if(filters.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(filters);
		}
		return await this.prisma.asset.findMany(prismaRequestArgs);
	}

	// Count
	async countAssets(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
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