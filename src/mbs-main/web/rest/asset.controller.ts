import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AssetBusinessService } from "../../business/asset.business.service";
import { AssetDto } from "../../dto/asset.dto";

@ApiTags('asset')
@Controller('mbs/main')
export class AssetController {
    constructor(
        private assetBusinessService: AssetBusinessService,

    ) {}

    @Post('assets')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    createAsset(@Body() assetDto: AssetDto) {
        if(assetDto.id !== undefined) {
            throw new BadRequestException("not insert id in creation");
        }
        return this.assetBusinessService.createAsset(assetDto);
    }

    @Put('assets')
    @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    updateAsset(@Body() assetDto: AssetDto) {
        if(assetDto.id === undefined) {
            throw new BadRequestException("id is required in update");
        }
        return this.assetBusinessService.editAsset(assetDto);
    }

    @Get('assets')
    @ApiResponse({ status: 200, description: 'List of assets.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAllAssets(@Query() queryParams): Promise<any> {
        let filters: any = queryParams;
        return this.assetBusinessService.searchAssets(filters);
    }

    @Get('assets/count')
    @ApiResponse({ status: 200, description: 'Count of assets.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getAssetsCount(@Query() queryParams): Promise<number> {
        let filters: any = queryParams;
        return this.assetBusinessService.countAssets(filters);
    }

    @Get('assets/:id')
    @ApiResponse({ status: 200, description: 'Asset detail.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getAsset(@Param('id') id: number): Promise<AssetDto> {
        let assetDto: AssetDto = await this.assetBusinessService.getAsset(+id);
        if(assetDto === null) throw new NotFoundException();
        return assetDto;
    }

    @Delete('assets/:id/delete')
    @ApiResponse({ status: 200, description: 'Asset deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    deleteAsset(@Param('id') id: number) {
        return this.assetBusinessService.deleteAsset(+id);
    }

}