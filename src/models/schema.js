import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'activities',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'subtitle', type: 'string', isOptional: true},
        {name: 'scheduled_at', type: 'number'},
        {name: 'is_completed', type: 'boolean'},
      ],
    }),
    tableSchema({
      name: 'sub_activities',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'subtitle', type: 'string', isOptional: true},
        {name: 'scheduled_at', type: 'number', isOptional: true},
        {name: 'is_completed', type: 'boolean'},
        {name: 'activity_id', type: 'string'},
      ],
    }),
  ],
});
