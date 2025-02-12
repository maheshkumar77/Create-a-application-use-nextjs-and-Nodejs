import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CronJobController } from './cron-job.controller';
import { CronJobService } from './cron-job.service';
import { CronJob, CronJobSchema } from './cron-job.schema';
import { CronJobHistory, CronJobHistorySchema } from './cron-job-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CronJob.name, schema: CronJobSchema },
      { name: CronJobHistory.name, schema: CronJobHistorySchema },
    ]),
  ],
  controllers: [CronJobController],
  providers: [CronJobService],
})
export class CronJobModule {}
