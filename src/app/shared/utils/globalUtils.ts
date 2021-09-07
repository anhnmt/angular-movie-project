import {Option} from '../interfaces/option';
import {MovieType} from '../interfaces/movie-type';

export class GlobalUtils {

  static mapMovieType(movieTypes: MovieType[], movieTypeId: number): MovieType {
    return movieTypes.find(obj => obj.movie_type_id === movieTypeId) || null;
  }

  static getDefaultStatus(): Option[] {
    return [
      {label: 'Hoạt động', value: 1, badge: 'success'},
      {label: 'Bản nháp', value: 2, badge: 'warning'}
    ];
  }

  static mapDefaultStatus(status: number): Option {
    const lists = GlobalUtils.getDefaultStatus();
    return lists.find(obj => obj.value === status) || null;
  }

  static getDefaultGender(): Option[] {
    return [
      {label: 'Nam', value: 1, badge: 'success'},
      {label: 'Nữ', value: 0, badge: 'warning'}
    ];
  }

  static mapDefaultGender(gender: number): Option {
    const lists = GlobalUtils.getDefaultGender();
    return lists.find(obj => obj.value === gender) || null;
  }

  static getFirst(array: any[]): any {
    if (array && array.length > 0) {
      return array[0] ?? null;
    }

    return null;
  }

  static mapEpisodeServerLink(link: string): string {
    const REGEX_YOUTUBE = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((?:\w|-){11})(?:&list=(\S+))?$/ig;

    if (link) {
      if (link.match(REGEX_YOUTUBE)) {
        link = link.replace(REGEX_YOUTUBE, 'https://www.youtube.com/embed/$1');
        console.log(link);
      }

      return link;

    }

    return null;
  }

}
