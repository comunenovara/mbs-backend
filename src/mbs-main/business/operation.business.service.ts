import { Injectable } from "@nestjs/common";
import { OperationDto } from "../dto/operation.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

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

    async getOperations(queryParams: any): Promise<OperationDto[]> {
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
            prismaRequestArgs['include'] = {
                type: true,
                asset: true,
            };
        }
        // Order
		if(queryParams.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(queryParams);
		}
        return await this.prisma.operation.findMany(prismaRequestArgs);
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