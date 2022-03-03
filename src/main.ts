import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	const options = new DocumentBuilder()
		.setTitle("Danerob-NFT")
		.setVersion("1.0")
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup("", app, document);

	await app.listen(process.env.PORT || 4000);
}
bootstrap();
