import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({
		whitelist: true
	}));

	app.enableCors();
	
	// Swagger
	{
		const config = new DocumentBuilder()
			.setTitle('Mbs Api')
			.setDescription('Mbs Api documentation')
			.setVersion('1.0')
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api', app, document);
	}

	await app.listen(3000);
}
bootstrap();
