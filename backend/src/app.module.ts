import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "postgres",
    password: "1234",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    schema: "ecommerce",
    // synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
  }),
    ProductsModule,
    AuthModule,
    UsersModule,
    BrandsModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    PaymentsModule],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
