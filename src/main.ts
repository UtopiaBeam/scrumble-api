import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SanitizationPipe } from './pipe/sanitization.pipe';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({ transform: true }),
        new SanitizationPipe(),
    );
    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    }
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
