import {Status} from '../interfaces/status';

export class StatusUtils {
  static getDefaultStatus(): Status[] {
    return [
      {label: 'Hoạt động', value: 1, badge: 'success'},
      {label: 'Bản nháp', value: 2, badge: 'warning'}
    ];
  }

  static mapDefaultStatus(status: number): Status {
    const lists = StatusUtils.getDefaultStatus();
    return lists.find(obj => obj.value === status) || null;
  }
}
