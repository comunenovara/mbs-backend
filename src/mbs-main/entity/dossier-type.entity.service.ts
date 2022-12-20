import { Injectable } from "@nestjs/common";
import { DossierTypeDto } from "../dto/dossier-type.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class DossierTypeEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertDossierType(dossierTypeDto: DossierTypeDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			description: dossierTypeDto.description,
			category: dossierTypeDto.category,
		};
		// Relations
		return await this.prisma.dossierType.create(prismaRequestArgs);
	}

	async updateDossierType(dossierTypeDto: DossierTypeDto) {
		return await this.prisma.dossierType.update({
			where: {
				id: dossierTypeDto.id,
			},
			data: {
				description: dossierTypeDto.description,
				category: dossierTypeDto.category,
			},
		});
	}

	// Get
	async getDossierTypes(filters: any): Promise<DossierTypeDto[]> {
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
		return await this.prisma.dossierType.findMany(prismaRequestArgs);
	}

	// Count
	async countDossierTypes(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.dossierType.count(prismaRequestArgs);
	}

	async getDossierType(id: number): Promise<DossierTypeDto> {
		return await this.prisma.dossierType.findUnique({
			where: {
				id: id,
			},
		})
	}

	async deleteDossierType(id: number) {
		return await this.prisma.dossierType.delete({
			where: {
				id: id,
			}
		});
	}
}