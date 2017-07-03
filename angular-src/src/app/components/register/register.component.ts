import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../Services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  email:String;
  username:String;
  password:String;

  constructor(private validateService:ValidateService) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const User={
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    };
    //required fields
    if(!this.validateService.validateRegister(User)){
        console.log("All the fields required !");
        return false;
      }
    if(!this.validateService.validateEmail(User.email)){
      console.log('Pleasse enter a Valid email address ! ');
      return false;
    }
  }
  

  

}
