import { Injectable } from "@nestjs/common";
import { AssetDto } from "../dto/asset.dto";
import { PrismaService } from "../repository/prisma.service";

@Injectable({})
export class AssetBusinessService {
    constructor(
        private prisma: PrismaService,
    ) {}

	async addAsset(assetDto: AssetDto) {
		return await this.prisma.asset.create({
			data: {
				description: assetDto.description,
				address: assetDto.address,
				mq: assetDto.mq,
			},
		});
	}

    async editAsset(assetDto: AssetDto) {
        return await this.prisma.asset.update({
            where: {
                id: assetDto.id,
            },
			data: {
				description: assetDto.description,
				address: assetDto.address,
				mq: assetDto.mq,
			},
        });
    }

    getAssets() {
        return this.prisma.asset.findMany()
    }

    getAsset(id: number) {
        return this.prisma.asset.findUnique({
            where: {
                id: id,
            }
        })
    }

    async deleteAsset(id: number) {
        return await this.prisma.asset.delete({
            where: {
                id: id,
            }
        });
    }
}