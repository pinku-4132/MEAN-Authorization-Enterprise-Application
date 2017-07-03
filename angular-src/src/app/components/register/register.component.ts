import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../Services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';

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

  constructor(private validateService:ValidateService,private flashMessage:FlashMessagesService) { }

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
        this.flashMessage.show("All the fields required !",{cssClass:'alert-danger',timeout:10000});
        return false;
      }
    if(!this.validateService.validateEmail(User.email)){
      this.flashMessage.show('Pleasse enter a Valid email address ! ',{cssClass:'alert-danger',timeout:10000});
      return false;
    }
  }
  

  

}
