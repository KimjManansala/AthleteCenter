import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { TrainingSessionService } from './training-session/training-session.service';
import { TrainingSessionController } from './training-session/training-session.controller';
import { TrainingSessionModule } from './training-session/training-session.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, TrainingSessionModule],
  controllers: [AppController, TrainingSessionController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    TrainingSessionService,
  ],
})
export class AppModule {}
