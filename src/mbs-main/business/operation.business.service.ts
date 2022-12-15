import { Injectable } from "@nestjs/common";
import { OperationDto } from "../dto/operation.dto";
import { OperationEntityService } from "../entity/operation.entity.service";

@Injectable({})
export class OperationBusinessService {
	constructor(
		private operationEntityService: OperationEntityService,
	) {}

	async createOperation(operationDto: OperationDto) {
		return this.operationEntityService.insertOperation(operationDto);
	}

	async editOperation(operationDto: OperationDto) {
		return this.operationEntityService.updateOperation(operationDto);
	}

	async searchOperations(filter: any): Promise<OperationDto[]> {
		return this.operationEntityService.getOperations(filter);
	}

	// Count
	async countOperations(filter: any): Promise<number> {
		return this.operationEntityService.countOperations(filter);
	}

	async getOperation(id: number): Promise<OperationDto> {
		return this.operationEntityService.getOperation(id);
	}

	async deleteOperation(id: number) {
		return this.operationEntityService.deleteOperation(id);
	}
}