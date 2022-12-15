import { Injectable } from "@nestjs/common";
import { DossierTypeDto } from "../dto/dossier-type.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class DossierTypeBusinessService {
	constructor(
		private prisma: PrismaService,
	) {}

	async addDossierType(dossierTypeDto: DossierTypeDto) {
		return await this.prisma.dossierType.create({
			data: {
				description: dossierTypeDto.description,
				category: dossierTypeDto.category,
			},
		});
	}

	async editDossierType(dossierTypeDto: DossierTypeDto) {
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

	// Search
	async getDossierTypes(queryParams: any): Promise<DossierTypeDto[]> {
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
		return await this.prisma.dossierType.findMany(prismaRequestArgs);
	}

	// Count
	async countDossierTypes(queryParams: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{

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