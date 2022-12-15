import { Injectable } from "@nestjs/common";
import { DossierDto } from "../dto/dossier.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class DossierEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertDossier(dossierDto: DossierDto) {
		return await this.prisma.dossier.create({
			data: {
				typeId: dossierDto.typeId,
				assetId: dossierDto.assetId,
				relifId: dossierDto.relifId,
				operationId: dossierDto.operationId,
				description: dossierDto.description,
			},
		});
	}

	async updateDossier(dossierDto: DossierDto) {
		return await this.prisma.dossier.update({
			where: {
				id: dossierDto.id,
			},
			data: {
				typeId: dossierDto.typeId,
				assetId: dossierDto.assetId,
				relifId: dossierDto.relifId,
				operationId: dossierDto.operationId,
				description: dossierDto.description,
			},
		});
	}

	// Get
	async getDossiers(filters: any): Promise<DossierDto[]> {
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
				type: true,
				asset: true,
				relif: true,
				operation: true,
			};
		}
		// Order
		if(filters.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(filters);
		}
		return await this.prisma.dossier.findMany(prismaRequestArgs);
	}

	// Count
	async countDossiers(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{

		}
		return await this.prisma.dossier.count(prismaRequestArgs);
	}

	async getDossier(id: number): Promise<DossierDto> {
		return await this.prisma.dossier.findUnique({
			where: {
				id: id,
			},
			include: {
				type: true,
				asset: true,
				relif: true,
				operation: true,
			},
		})
	}

	async deleteDossier(id: number) {
		return await this.prisma.dossier.delete({
			where: {
				id: id,
			}
		});
	}
}