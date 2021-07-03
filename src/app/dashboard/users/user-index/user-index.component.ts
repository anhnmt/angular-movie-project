import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/interfaces/user.type';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {
  searchInput: string | number;
  displayData = [];

  users: User[] = [];

  orderColumn = [
    {
      title: 'ID',
      compare: (a: User, b: User) => a.user_id - b.user_id,
    },
    {
      title: 'Tên người dùng',
      compare: (a: User, b: User) => a.name.localeCompare(b.name)
    },
    {
      title: 'Username',
      compare: (a: User, b: User) => a.username.localeCompare(b.username)
    },
    {
      title: 'Giới tính',
      compare: (a: User, b: User) => a.gender - b.gender,
    },
    {
      title: ''
    }
  ];

  constructor(
    private tableSvc: TableService,
    private nzMessageService: NzMessageService,
    private userService: UserService,
    private sharedService: SharedService,
  ) {
    this.sharedService.changeEmitted$.subscribe(() => {
      this.list();
    });
  }

  ngOnInit(): void {
    this.list();
  }

  search(): void {
    const data = this.users;
    this.displayData = this.tableSvc.search(this.searchInput, data);
  }

  list(): void {
    this.users = [];

    this.userService.getAllUsers().subscribe((response) => {
      this.users = response.data;
      console.log(this.users);

      this.displayData = this.users;
    });
  }

  delete(userId: number): void {
    this.userService.deleteUserByUserId(userId).subscribe(() => {
      this.list();
      this.nzMessageService.success('Xóa Thành Công');
    });
  }
}
