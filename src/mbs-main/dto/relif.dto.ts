import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
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
		type: Date,
		required: false
	})
	@IsNotEmpty()
	@IsString()
	date?: Date;

    @ApiProperty({
		type: String,
		required: false
	})
	@IsNotEmpty()
	@IsString()
	reason?: string;

	asset?: AssetDto;

}