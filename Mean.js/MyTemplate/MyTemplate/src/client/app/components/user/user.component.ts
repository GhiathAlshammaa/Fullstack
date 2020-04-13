import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private webService: WebService) { }

  model = {
    firstName: '',
    lastName: ''
  };

  ngOnInit(): void {
    // this.webService.getUser().subscribe(res => {
    //   this.model.firstName = res.firstName;
    //   this.model.lastName = res.lastName;
    // })
  }

  saveChanges() {
    // this.webService.saveUser(this.model).subscribe();
    console.log("Not yet Done");
  }

}
