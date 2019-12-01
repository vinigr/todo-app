export class ActivitiesModel {
  name = 'Activities';

  props = {
    title: 'string',
    subtitle: '?string',
    screduledAt: 'datetime',
    hourActive: 'boolean',
    completed: 'boolean',
  };
}
