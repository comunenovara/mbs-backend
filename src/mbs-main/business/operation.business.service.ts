import { Injectable } from "@nestjs/common";
import { OperationDto } from "../dto/operation.dto";
import { PrismaService } from "../repository/prisma.service";

@Injectable({})
export class OperationBusinessService {
    constructor(
        private prisma: PrismaService,
    ) {}

	async addOperation(operationDto: OperationDto) {
		return await this.prisma.operation.create({
			data: {
				typeId: operationDto.typeId,
				assetId: operationDto.assetId,
				description: operationDto.description,
				value: operationDto.value,
				startDate: operationDto.startDate,
				endDate: operationDto.endDate,
			},
		});
	}

    async editOperation(operationDto: OperationDto) {
        return await this.prisma.operation.update({
            where: {
                id: operationDto.id,
            },
			data: {
				typeId: operationDto.typeId,
				assetId: operationDto.assetId,
				description: operationDto.description,
				value: operationDto.value,
				startDate: operationDto.startDate,
				endDate: operationDto.endDate,
			},
        });
    }

    async getOperations(): Promise<OperationDto[]> {
        return await this.prisma.operation.findMany({
            include: {
                type: true,
                asset: true,
            },
        })
    }

    async getOperation(id: number): Promise<OperationDto> {
        return await this.prisma.operation.findUnique({
            where: {
                id: id,
            },
            include: {
                type: true,
                asset: true,
            },
        })
    }

    async deleteOperation(id: number) {
        return await this.prisma.operation.delete({
            where: {
                id: id,
            }
        });
    }
}