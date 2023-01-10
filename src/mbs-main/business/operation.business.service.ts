import { Injectable } from "@nestjs/common";
import { OperationDto } from "../dto/operation.dto";
import { OperationEntityService } from "../entity/operation.entity.service";
import { OperationFileService } from "../mbs/file/operation.file.service";

@Injectable({})
export class OperationBusinessService {
	constructor(
		private operationEntityService: OperationEntityService,
		private operationFileService: OperationFileService,
	) {}

	async createOperation(operationDto: OperationDto) {
		let operation: OperationDto = await this.operationEntityService.insertOperation(operationDto);
		this.operationFileService.createOperation(operation);
		return operation
	}

	async editOperation(operationDto: OperationDto) {
		return this.operationEntityService.updateOperation(operationDto);
	}

	async searchOperations(filters: any): Promise<OperationDto[]> {
		return this.operationEntityService.getOperations(filters);
	}

	async countOperations(filters: any): Promise<number> {
		return this.operationEntityService.countOperations(filters);
	}

	async getOperation(id: number): Promise<OperationDto> {
		return this.operationEntityService.getOperation(id);
	}

	async deleteOperation(id: number) {
		let operation = await this.getOperation(id);
		try {
			this.operationFileService.deleteOperationFolder(operation);	
		} catch (error) {
			console.log("errore nella cancellazione della cartella");
		}
		return this.operationEntityService.deleteOperation(id);
	}
}