import { Injectable } from "@nestjs/common";
import { OperationTypeDto } from "../dto/operation-type.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

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
			data: {
				description: operationTypeDto.description,
			},
        });
    }

    async getOperationTypes(queryParams: any): Promise<OperationTypeDto[]> {
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
        }
        // Order
		if(queryParams.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(queryParams);
		}
        return await this.prisma.operationType.findMany(prismaRequestArgs);
    }

    async getOperationType(id: number): Promise<OperationTypeDto> {
        return await this.prisma.operationType.findUnique({
            where: {
                id: id,
            },
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