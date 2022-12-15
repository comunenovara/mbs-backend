import { Injectable } from "@nestjs/common";
import { OperationTypeDto } from "../dto/operation-type.dto";
import { OperationTypeEntityService } from "../entity/operationType.entity.service";

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

	async searchOperationTypes(filter: any): Promise<OperationTypeDto[]> {
		return this.operationTypeEntityService.getOperationTypes(filter);
	}

	// Count
	async countOperationTypes(filter: any): Promise<number> {
		return this.operationTypeEntityService.countOperationTypes(filter);
	}

	async getOperationType(id: number): Promise<OperationTypeDto> {
		return this.operationTypeEntityService.getOperationType(id);
	}

	async deleteOperationType(id: number) {
		return this.operationTypeEntityService.deleteOperationType(id);
	}
}