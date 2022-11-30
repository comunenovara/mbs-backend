import { Injectable } from "@nestjs/common";
import { OperationTypeDto } from "../dto/operation-type.dto";
import { PrismaService } from "../repository/prisma.service";

@Injectable({})
export class OperationTypeBusinessService {
    constructor(
        private prisma: PrismaService,
    ) {}

	async addOperationType(operationTypeDto: OperationTypeDto) {
		return await this.prisma.operationType.create({
			data: {
				description: operationTypeDto.description,
			},
		});
	}

    async editOperationType(operationTypeDto: OperationTypeDto) {
        return await this.prisma.operationType.update({
            where: {
                id: operationTypeDto.id,
            },
            data: operationTypeDto,
        });
    }

    getOperationTypes() {
        return this.prisma.operationType.findMany()
    }

    getOperationType(id: number) {
        return this.prisma.operationType.findUnique({
            where: {
                id: id,
            }
        })
    }

    async deleteOperationType(id: number) {
        return await this.prisma.operationType.delete({
            where: {
                id: id,
            }
        });
    }
}