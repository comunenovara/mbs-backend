import { Injectable } from "@nestjs/common";
import { RelifDto } from "../dto/relif.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class RelifEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertRelif(relifDto: RelifDto) {
		return await this.prisma.relif.create({
			data: {
				assetId: relifDto.assetId,
				description: relifDto.description,
				startDate: relifDto.startDate,
				endDate: relifDto.endDate,
			},
		});
	}

	async updateRelif(relifDto: RelifDto) {
		return await this.prisma.relif.update({
			where: {
				id: relifDto.id,
			},
			data: {
				assetId: relifDto.assetId,
				description: relifDto.description,
				startDate: relifDto.startDate,
				endDate: relifDto.endDate,
			},
		});
	}

	// Get
	async getRelifs(filters: any): Promise<RelifDto[]> {
		let prismaRequestArgs: any = {};
		// Pagination
		if(filters.size !== undefined && filters.page !== undefined) {
			prismaRequestArgs = { ...QueryParamsTools.getPrismaPaginationObject(filters) };
		}
		// Filter
		{

		}
		// Join
		{
			prismaRequestArgs['include'] = {
				asset: true,
			};
		}
		// Order
		if(filters.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(filters);
		}
		return await this.prisma.relif.findMany(prismaRequestArgs);
	}

	// Count
	async countRelifs(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{

		}
		return await this.prisma.relif.count(prismaRequestArgs);
	}

	async getRelif(id: number): Promise<RelifDto> {
		return await this.prisma.relif.findUnique({
			where: {
				id: id,
			},
			include: {
				asset: true,
			},
		})
	}

	async deleteRelif(id: number) {
		return await this.prisma.relif.delete({
			where: {
				id: id,
			}
		});
	}
}