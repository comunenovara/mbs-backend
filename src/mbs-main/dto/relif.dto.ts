import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Decimal } from "@prisma/client/runtime";

import { AssetDto } from "./asset.dto";

export class RelifDto {
	
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

    @ApiProperty({
		type: Date,
		required: false
	})
	@IsNotEmpty()
	@IsString()
	startDate?: Date;

    @ApiProperty({
		type: Date,
		required: false
	})
	@IsNotEmpty()
	@IsString()
	endDate?: Date;


	@IsNumber()
	assetId?: number;
	asset?: AssetDto;

}