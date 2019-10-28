import {Model} from '@nozbe/watermelondb';
import {field, date, relation} from '@nozbe/watermelondb/decorators';

export default class SubActivity extends Model {
  static table = 'sub_activities';
  static associations = {
    activities: {type: 'belongs_to', key: 'activity_id'},
  };

  @field('title') title;
  @field('is_completed') isCompleted;
  @date('scheduled_at') scheduledAt;
  @relation('activities', 'activity_id') activity;
}
