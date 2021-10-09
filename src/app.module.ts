import { Module } from '@nestjs/common';
import { BlogModule } from './blogs/blog.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module'
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    BlogModule,
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
