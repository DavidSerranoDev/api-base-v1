import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'monorail.proxy.rlwy.net',
      port:21882,
      username:'root',
      password:'FbBgEF-3HA4ED1FDc1eGbCDefG2bfDD5',
      database:'railway',
      entities: [__dirname + '/**/*.entity.{js,ts}']
    }),
    UsersModule,
    AuthModule 

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
