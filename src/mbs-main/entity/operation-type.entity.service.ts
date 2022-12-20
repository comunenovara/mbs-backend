import { Injectable } from "@nestjs/common";
import { OperationTypeDto } from "../dto/operation-type.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class OperationTypeEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertOperationType(operationTypeDto: OperationTypeDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			description: operationTypeDto.description,
		};
		// Relations
		return await this.prisma.operationType.create(prismaRequestArgs);
	}

	async updateOperationType(operationTypeDto: OperationTypeDto) {
		return await this.prisma.operationType.update({
			where: {
				id: operationTypeDto.id,
			},
			data: {
				description: operationTypeDto.description,
			},
		});
	}

	// Get
	async getOperationTypes(filters: any): Promise<OperationTypeDto[]> {
		let prismaRequestArgs: any = {};
		// Pagination
		if(filters.size !== undefined && filters.page !== undefined) {
			prismaRequestArgs = { ...QueryParamsTools.getPrismaPaginationObject(filters) };
		}
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		// Join
		{
		}
		// Order
		if(filters.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(filters);
		}
		return await this.prisma.operationType.findMany(prismaRequestArgs);
	}

	// Count
	async countOperationTypes(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.operationType.count(prismaRequestArgs);
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