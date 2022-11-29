import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AssetBusinessService } from "src/mbs/business/asset.business.service";
import { AssetDto } from "src/mbs/dto/asset.dto";

@ApiTags('asset')
@Controller('mbs')
export class AssetController {
    constructor(
        private assetBusinessService: AssetBusinessService,

    ) {}

    @Post('assets')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createAsset(@Body() assetDto: AssetDto) {
        return this.assetBusinessService.addAsset(assetDto);
    }

    @Put('assets')
    updateAsset(@Body() assetDto: AssetDto) {
        // TODO - CREARE METODO DI UPDATE
        return this.assetBusinessService.editAsset(assetDto);
    }

    @Get('assets')
    getAllAssets(): Promise<any> {
        // TODO - AGGIUNGERE FILTRI
        return this.assetBusinessService.getAssets();
    }

    @Get('assets/count')
    getAssetsCount(): Promise<any> {
        // TODO - AGGIUNGERE FILTRI
        return new Promise((resolve) => {
            resolve(2);
        });
    }

    @Get('assets/:id')
    getAsset(@Param('id') id: number): Promise<any> {
        // SE NON TROVA VAI IN 404
        return this.assetBusinessService.getAsset(+id);
    }

    @Delete('assets/:id/delete')
    deleteAsset(@Param('id') id: number) {
        // TODO - CREARE METODO DI DELETE
        return this.assetBusinessService.deleteAsset(+id);
    }

}