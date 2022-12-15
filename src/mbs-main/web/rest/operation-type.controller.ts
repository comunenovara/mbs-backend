import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { OperationTypeBusinessService } from "../../business/operation-type.business.service";
import { OperationTypeDto } from "../../dto/operation-type.dto";

@ApiTags('operationType')
@Controller('mbs/main')
export class OperationTypeController {
    constructor(
        private operationTypeBusinessService: OperationTypeBusinessService,

    ) {}

    @Post('operationTypes')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createOperationType(@Body() operationTypeDto: OperationTypeDto) {
        if(operationTypeDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.operationTypeBusinessService.createOperationType(operationTypeDto);
    }

    @Put('operationTypes')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateOperationType(@Body() operationTypeDto: OperationTypeDto) {
        if(operationTypeDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.operationTypeBusinessService.editOperationType(operationTypeDto);
    }

    @Get('operationTypes')
    @ApiResponse({ status: 200, description: 'List of operationTypes.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllOperationTypes(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.operationTypeBusinessService.searchOperationTypes(filters);
    }

    @Get('operationTypes/count')
    @ApiResponse({ status: 200, description: 'Count of operationTypes.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getOperationTypesCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.operationTypeBusinessService.countOperationTypes(filters);
    }

    @Get('operationTypes/:id')
    @ApiResponse({ status: 200, description: 'OperationType detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getOperationType(@Param('id') id: number): Promise<OperationTypeDto> {
        let operationTypeDto: OperationTypeDto = await this.operationTypeBusinessService.getOperationType(+id);
        if(operationTypeDto === null) throw new NotFoundException();
        return operationTypeDto;
    }

    @Delete('operationTypes/:id/delete')
    @ApiResponse({ status: 200, description: 'OperationType deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteOperationType(@Param('id') id: number) {
        return this.operationTypeBusinessService.deleteOperationType(+id);
    }

}