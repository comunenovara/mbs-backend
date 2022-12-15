import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Decimal } from "@prisma/client/runtime";


export class AssetDto {
	
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
		type: String,
		required: false
	})
	@IsNotEmpty()
	@IsString()
	address?: string;

    @ApiProperty({
		type: Number,
		required: false
	})
	@IsNotEmpty()
	@IsString()
	mq?: number;


}