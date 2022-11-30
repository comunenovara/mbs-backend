import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
		required: true
	})
	@IsNotEmpty()
	@IsString()
	description: string;
}