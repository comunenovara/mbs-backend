import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { DossierTypeBusinessService } from "../../business/dossier-type.business.service";
import { DossierTypeDto } from "../../dto/dossier-type.dto";

@ApiTags('dossierType')
@Controller('mbs/main')
export class DossierTypeController {
    constructor(
        private dossierTypeBusinessService: DossierTypeBusinessService,

    ) {}

    @Post('dossierTypes')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createDossierType(@Body() dossierTypeDto: DossierTypeDto) {
        if(dossierTypeDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.dossierTypeBusinessService.createDossierType(dossierTypeDto);
    }

    @Put('dossierTypes')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateDossierType(@Body() dossierTypeDto: DossierTypeDto) {
        if(dossierTypeDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.dossierTypeBusinessService.editDossierType(dossierTypeDto);
    }

    @Get('dossierTypes')
    @ApiResponse({ status: 200, description: 'List of dossierTypes.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllDossierTypes(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.dossierTypeBusinessService.searchDossierTypes(filters);
    }

    @Get('dossierTypes/count')
    @ApiResponse({ status: 200, description: 'Count of dossierTypes.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getDossierTypesCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.dossierTypeBusinessService.countDossierTypes(filters);
    }

    @Get('dossierTypes/:id')
    @ApiResponse({ status: 200, description: 'DossierType detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getDossierType(@Param('id') id: number): Promise<DossierTypeDto> {
        let dossierTypeDto: DossierTypeDto = await this.dossierTypeBusinessService.getDossierType(+id);
        if(dossierTypeDto === null) throw new NotFoundException();
        return dossierTypeDto;
    }

    @Delete('dossierTypes/:id/delete')
    @ApiResponse({ status: 200, description: 'DossierType deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteDossierType(@Param('id') id: number) {
        return this.dossierTypeBusinessService.deleteDossierType(+id);
    }

}