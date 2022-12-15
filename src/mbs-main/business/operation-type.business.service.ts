import { Injectable } from "@nestjs/common";
import { OperationTypeDto } from "../dto/operation-type.dto";
import { OperationTypeEntityService } from "../entity/operation-type.entity.service";

@Injectable({})
export class OperationTypeBusinessService {
	constructor(
		private operationTypeEntityService: OperationTypeEntityService,
	) {}

	async createOperationType(operationTypeDto: OperationTypeDto) {
		return this.operationTypeEntityService.insertOperationType(operationTypeDto);
	}

	async editOperationType(operationTypeDto: OperationTypeDto) {
		return this.operationTypeEntityService.updateOperationType(operationTypeDto);
	}

	async searchOperationTypes(filters: any): Promise<OperationTypeDto[]> {
		return this.operationTypeEntityService.getOperationTypes(filters);
	}

	async countOperationTypes(filters: any): Promise<number> {
		return this.operationTypeEntityService.countOperationTypes(filters);
	}

	async getOperationType(id: number): Promise<OperationTypeDto> {
		return this.operationTypeEntityService.getOperationType(id);
	}

	async deleteOperationType(id: number) {
		return this.operationTypeEntityService.deleteOperationType(id);
	}
}