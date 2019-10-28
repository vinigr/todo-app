import {Model} from '@nozbe/watermelondb';
import {field, date, children} from '@nozbe/watermelondb/decorators';

export default class Activity extends Model {
  static table = 'activities';
  static associations = {
    sub_activities: {type: 'has_many', foreignKey: 'activity_id'},
  };

  @field('title') title;
  @field('is_completed') isCompleted;
  @date('scheduled_at') scheduledAt;
  @children('sub_activities', 'activity_id') activity;
}
