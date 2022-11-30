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
				date: relifDto.date,
				reason: relifDto.reason,
			},
		});
	}

    async editRelif(relifDto: RelifDto) {
        return await this.prisma.relif.update({
            where: {
                id: relifDto.id,
            },
            data: relifDto,
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