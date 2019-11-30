export class SubActivitiesModel {
  name = 'SubActivities';

  props = {
    title: 'string',
    subtitle: '?string',
    screduledAt: 'datetime',
    completed: 'boolean',
    assignedTo: '#User',
  };
}
