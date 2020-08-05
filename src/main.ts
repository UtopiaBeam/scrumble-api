import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { registerEnumType } from '@nestjs/graphql';
import { Role } from './enums/role';
import { Priority } from './enums/priority';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    }
    
    registerEnumType(Role, { name: 'Role' });
    registerEnumType(Priority, { name: 'Priority' });

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
