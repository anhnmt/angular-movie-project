import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/interfaces/user.type';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  selectedCategory: string;
  selectedStatus: string;
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
  ) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response.data;
      console.log(this.users);

      this.displayData = this.users;
    });
  }

  search(): void {
    const data = this.users;
    this.displayData = this.tableSvc.search(this.searchInput, data);
  }

  // categoryChange(value: string): void {
  //   const data = this.users;
  //   value !== 'All' ? this.displayData = data.filter(elm => elm.category === value) : this.displayData = data;
  // }
  //
  // statusChange(value: string): void {
  //   const data = this.users;
  //   value !== 'All' ? this.displayData = data.filter(elm => elm.status === value) : this.displayData = data;
  // }

  confirm(): void {
    this.nzMessageService.info('click confirm');
  }
}
