export class SubActivitiesModel {
  name = 'SubActivities';

  props = {
    title: 'string',
    subtitle: '?string',
    completed: 'boolean',
    assignedTo: '#User',
  };
}
