import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { RelifBusinessService } from "../../business/relif.business.service";
import { RelifDto } from "../../dto/relif.dto";

@ApiTags('relif')
@Controller('mbs/main')
export class RelifController {
    constructor(
        private relifBusinessService: RelifBusinessService,

    ) {}

    @Post('relifs')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createRelif(@Body() relifDto: RelifDto) {
        if(relifDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.relifBusinessService.createRelif(relifDto);
    }

    @Put('relifs')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateRelif(@Body() relifDto: RelifDto) {
        if(relifDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.relifBusinessService.editRelif(relifDto);
    }

    @Get('relifs')
    @ApiResponse({ status: 200, description: 'List of relifs.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllRelifs(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.relifBusinessService.searchRelifs(filters);
    }

    @Get('relifs/count')
    @ApiResponse({ status: 200, description: 'Count of relifs.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getRelifsCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.relifBusinessService.countRelifs(filters);
    }

    @Get('relifs/:id')
    @ApiResponse({ status: 200, description: 'Relif detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getRelif(@Param('id') id: number): Promise<RelifDto> {
        let relifDto: RelifDto = await this.relifBusinessService.getRelif(+id);
        if(relifDto === null) throw new NotFoundException();
        return relifDto;
    }

    @Delete('relifs/:id/delete')
    @ApiResponse({ status: 200, description: 'Relif deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteRelif(@Param('id') id: number) {
        return this.relifBusinessService.deleteRelif(+id);
    }

}