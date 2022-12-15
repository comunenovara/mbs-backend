import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { DossierBusinessService } from "../../business/dossier.business.service";
import { DossierDto } from "../../dto/dossier.dto";

@ApiTags('dossier')
@Controller('mbs/main')
export class DossierController {
    constructor(
        private dossierBusinessService: DossierBusinessService,

    ) {}

    @Post('dossiers')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createDossier(@Body() dossierDto: DossierDto) {
        if(dossierDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.dossierBusinessService.createDossier(dossierDto);
    }

    @Put('dossiers')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateDossier(@Body() dossierDto: DossierDto) {
        if(dossierDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.dossierBusinessService.editDossier(dossierDto);
    }

    @Get('dossiers')
    @ApiResponse({ status: 200, description: 'List of dossiers.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllDossiers(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.dossierBusinessService.searchDossiers(filters);
    }

    @Get('dossiers/count')
    @ApiResponse({ status: 200, description: 'Count of dossiers.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getDossiersCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.dossierBusinessService.countDossiers(filters);
    }

    @Get('dossiers/:id')
    @ApiResponse({ status: 200, description: 'Dossier detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getDossier(@Param('id') id: number): Promise<DossierDto> {
        let dossierDto: DossierDto = await this.dossierBusinessService.getDossier(+id);
        if(dossierDto === null) throw new NotFoundException();
        return dossierDto;
    }

    @Delete('dossiers/:id/delete')
    @ApiResponse({ status: 200, description: 'Dossier deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteDossier(@Param('id') id: number) {
        return this.dossierBusinessService.deleteDossier(+id);
    }

}