import { Injectable } from "@nestjs/common";
import { DossierDto } from "../dto/dossier.dto";
import { PrismaService } from "../repository/prisma.service";

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

    async getDossiers(): Promise<DossierDto[]> {
        return await this.prisma.dossier.findMany({
            include: {
                type: true,
                asset: true,
                relif: true,
                operation: true,
            },
        })
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