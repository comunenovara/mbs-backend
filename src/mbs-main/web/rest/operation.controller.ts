import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { OperationBusinessService } from "../../business/operation.business.service";
import { OperationDto } from "../../dto/operation.dto";

@ApiTags('operation')
@Controller('mbs/main')
export class OperationController {
    constructor(
        private operationBusinessService: OperationBusinessService,

    ) {}

    @Post('operations')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createOperation(@Body() operationDto: OperationDto) {
        if(operationDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.operationBusinessService.createOperation(operationDto);
    }

    @Put('operations')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateOperation(@Body() operationDto: OperationDto) {
        if(operationDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.operationBusinessService.editOperation(operationDto);
    }

    @Get('operations')
    @ApiResponse({ status: 200, description: 'List of operations.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllOperations(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.operationBusinessService.searchOperations(filters);
    }

    @Get('operations/count')
    @ApiResponse({ status: 200, description: 'Count of operations.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getOperationsCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.operationBusinessService.countOperations(filters);
    }

    @Get('operations/:id')
    @ApiResponse({ status: 200, description: 'Operation detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getOperation(@Param('id') id: number): Promise<OperationDto> {
        let operationDto: OperationDto = await this.operationBusinessService.getOperation(+id);
        if(operationDto === null) throw new NotFoundException();
        return operationDto;
    }

    @Delete('operations/:id/delete')
    @ApiResponse({ status: 200, description: 'Operation deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteOperation(@Param('id') id: number) {
        return this.operationBusinessService.deleteOperation(+id);
    }

}