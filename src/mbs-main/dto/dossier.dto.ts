import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Decimal } from "@prisma/client/runtime";

import { DossierTypeDto } from "./dossier-type.dto";
import { AssetDto } from "./asset.dto";
import { RelifDto } from "./relif.dto";
import { OperationDto } from "./operation.dto";

export class DossierDto {
	
	@ApiProperty({
		type: Number,
		required: false
	})
	@IsNumber()
	@IsOptional()
	id?: number;


    @ApiProperty({
		type: String,
		required: false
	})
	@IsNotEmpty()
	@IsString()
	description?: string;


	@IsOptional()
	@IsNumber()
	typeId?: number;
	type?: DossierTypeDto;

	@IsOptional()
	@IsNumber()
	assetId?: number;
	asset?: AssetDto;

	@IsOptional()
	@IsNumber()
	relifId?: number;
	relif?: RelifDto;

	@IsOptional()
	@IsNumber()
	operationId?: number;
	operation?: OperationDto;

}