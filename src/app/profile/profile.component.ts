import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { users } from '../data-type';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  
  

	constructor(private userService: UserService) {}
  
	ngOnInit(): void {
	 
	}

  
  
  
  
  

}
