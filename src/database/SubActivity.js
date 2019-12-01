export class SubActivitiesModel {
  name = 'SubActivities';

  props = {
    title: 'string',
    completed: 'boolean',
    assignedTo: '#User',
  };
}
