import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Observable string sources
  private emitChangeSource = new EventEmitter<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor() {
  }

  // Service message commands
  emitChange(change?: any): void {
    this.emitChangeSource.next(change);
  }
}
