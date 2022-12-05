import { Injectable } from "@nestjs/common";
import { RelifDto } from "../dto/relif.dto";
import { PrismaService } from "../repository/prisma.service";

@Injectable({})
export class RelifBusinessService {
    constructor(
        private prisma: PrismaService,
    ) {}

	async addRelif(relifDto: RelifDto) {
		return await this.prisma.relif.create({
			data: {
				assetId: relifDto.assetId,
				description: relifDto.description,
				startDate: relifDto.startDate,
				endDate: relifDto.endDate,
			},
		});
	}

    async editRelif(relifDto: RelifDto) {
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

    getRelifs() {
        return this.prisma.relif.findMany()
    }

    getRelif(id: number) {
        return this.prisma.relif.findUnique({
            where: {
                id: id,
            }
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