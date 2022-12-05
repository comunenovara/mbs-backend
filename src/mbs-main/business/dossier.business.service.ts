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
				dossierTypeId: dossierDto.typeId,
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
				dossierTypeId: dossierDto.typeId,
				assetId: dossierDto.assetId,
				relifId: dossierDto.relifId,
				operationId: dossierDto.operationId,
				description: dossierDto.description,
			},
        });
    }

    getDossiers() {
        return this.prisma.dossier.findMany()
    }

    getDossier(id: number) {
        return this.prisma.dossier.findUnique({
            where: {
                id: id,
            }
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