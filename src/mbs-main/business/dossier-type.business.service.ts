import { Injectable } from "@nestjs/common";
import { DossierTypeDto } from "../dto/dossier-type.dto";
import { PrismaService } from "../repository/prisma.service";

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

    getDossierTypes() {
        return this.prisma.dossierType.findMany()
    }

    getDossierType(id: number) {
        return this.prisma.dossierType.findUnique({
            where: {
                id: id,
            }
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