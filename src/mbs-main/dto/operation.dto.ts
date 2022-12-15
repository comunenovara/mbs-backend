import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Decimal } from "@prisma/client/runtime";

import { OperationTypeDto } from "./operation-type.dto";
import { AssetDto } from "./asset.dto";

export class OperationDto {
	
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
		type: Number,
		required: false
	})
	@IsNotEmpty()
	@IsString()
	value?: Decimal;

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
	typeId?: number;
	type?: OperationTypeDto;

	@IsNumber()
	assetId?: number;
	asset?: AssetDto;

}