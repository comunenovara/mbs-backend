import { Injectable } from "@nestjs/common";
import { DossierDto } from "../dto/dossier.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class DossierBusinessService {
	constructor(
		private prisma: PrismaService,
	) {}

	async addDossier(dossierDto: DossierDto) {
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

	async editDossier(dossierDto: DossierDto) {
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

	// Search
	async getDossiers(queryParams: any): Promise<DossierDto[]> {
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
			prismaRequestArgs['include'] = {
				type: true,
				asset: true,
				relif: true,
				operation: true,
			};
		}
		// Order
		if(queryParams.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(queryParams);
		}
		return await this.prisma.dossier.findMany(prismaRequestArgs);
	}

	// Count
	async countDossiers(queryParams: any): Promise<number> {
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