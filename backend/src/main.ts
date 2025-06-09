import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CookieParser())
  app.enableCors({
    origin: 'http://localhost:5173', // your React app origin
    credentials: true,              // 👈 allow cookies!
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
