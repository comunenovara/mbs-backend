import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
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

	type?: DossierTypeDto;
	asset?: AssetDto;
	relif?: RelifDto;
	operation?: OperationDto;

}