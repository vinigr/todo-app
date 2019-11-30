import Vasern from 'vasern';

import {ActivitiesModel} from './Activity';
import {SubActivitiesModel} from './SubActivity';

export default new Vasern({
  schemas: [ActivitiesModel, SubActivitiesModel],
  version: 2,
});
