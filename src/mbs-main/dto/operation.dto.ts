import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { OperationTypeDto } from "./operation-type.dto";
import { AssetDto } from "./asset.dto";
import { Decimal } from "@prisma/client/runtime";

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

	//typeId?: Number;
	type?: OperationTypeDto;

	assetId?: number;
	asset?: AssetDto;

}