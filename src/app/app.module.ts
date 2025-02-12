import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CronJobModule } from './cron-job/cron-job.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'views'), // Path to the frontend views
    }),
    CronJobModule,
  ],
})
export class AppModule {}
