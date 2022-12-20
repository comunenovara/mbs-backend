import { Injectable } from "@nestjs/common";
import { OperationDto } from "../dto/operation.dto";
import { PrismaService } from "../repository/prisma.service";
import { QueryParamsTools } from "../tools/query-params.class";

@Injectable({})
export class OperationEntityService {
	constructor(
		private prisma: PrismaService,
	) {}

	async insertOperation(operationDto: OperationDto) {
		let prismaRequestArgs: any = {};
		// Fileds
		prismaRequestArgs['data'] = {
			description: operationDto.description,
			value: operationDto.value,
			startDate: operationDto.startDate,
			endDate: operationDto.endDate,
		};
		// Relations
		if(operationDto.typeId != null) {
			prismaRequestArgs['data']['type'] = {
				connect: {
					id: operationDto.typeId
				}
			};
		}
		if(operationDto.assetId != null) {
			prismaRequestArgs['data']['asset'] = {
				connect: {
					id: operationDto.assetId
				}
			};
		}
		return await this.prisma.operation.create(prismaRequestArgs);
	}

	async updateOperation(operationDto: OperationDto) {
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

	// Get
	async getOperations(filters: any): Promise<OperationDto[]> {
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
			prismaRequestArgs['include'] = {
				type: true,
				asset: true,
			};
		}
		// Order
		if(filters.orderBy !== undefined) {
			prismaRequestArgs['orderBy'] = QueryParamsTools.getPrismaOrderByArray(filters);
		}
		return await this.prisma.operation.findMany(prismaRequestArgs);
	}

	// Count
	async countOperations(filters: any): Promise<number> {
		let prismaRequestArgs: any = {};
		// Filter
		{
			prismaRequestArgs['where'] = QueryParamsTools.getPrismaWhereObject(filters);
		}
		return await this.prisma.operation.count(prismaRequestArgs);
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