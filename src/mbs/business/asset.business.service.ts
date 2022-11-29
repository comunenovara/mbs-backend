import { BadRequestException, Injectable } from "@nestjs/common";
import { AssetDto } from "../dto/asset.dto";
import { PrismaService } from "../repository/prisma.service";

@Injectable({})
export class AssetBusinessService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async addAsset(assetDto: AssetDto) {
        if(assetDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return await this.prisma.asset.create({
            data: assetDto,
        });
    }

    async editAsset(assetDto: AssetDto) {
        if(assetDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return await this.prisma.asset.update({
            where: {
                id: assetDto.id,
            },
            data: assetDto,
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