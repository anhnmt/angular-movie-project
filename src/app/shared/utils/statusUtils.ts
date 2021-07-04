import {Status} from '../interfaces/status';

export class StatusUtils {
  static getDefaultStatus(): Status[] {
    return [
      {label: 'Hoạt động', value: 1, badge: 'success'},
      {label: 'Bản nháp', value: 2, badge: 'warning'}
    ];
  }
}
