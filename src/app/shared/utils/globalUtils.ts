import {Status} from '../interfaces/status';
import {MovieType} from '../interfaces/movie-type';

export class GlobalUtils {

  static mapMovieType(movieTypes: MovieType[], movieTypeId: number): MovieType {
    return movieTypes.find(obj => obj.movie_type_id === movieTypeId) || null;
  }

  static getDefaultStatus(): Status[] {
    return [
      {label: 'Hoạt động', value: 1, badge: 'success'},
      {label: 'Bản nháp', value: 2, badge: 'warning'}
    ];
  }

  static mapDefaultStatus(status: number): Status {
    const lists = GlobalUtils.getDefaultStatus();
    return lists.find(obj => obj.value === status) || null;
  }

}
