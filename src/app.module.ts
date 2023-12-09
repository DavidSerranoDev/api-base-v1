import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'david',
      password:'000000',
      database:'api_base_project_v1',
      entities: [__dirname + '/**/*.entity.{js,ts}']
    }) 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}