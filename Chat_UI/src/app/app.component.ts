import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.pusherData();
  }


  username = "san";
  message = "";
  messages : any[] = [];

  onSubmit(){
    this.http.post("https://localhost:44342/api/messages",{username:this.username, message:this.message}).subscribe((res:any)=>{
      this.message = "";
    });
  }

  //Pusher Link : https://dashboard.pusher.com/
  pusherData(){
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    const pusher = new Pusher('9516408a2d0b8d86257e', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data:any) => {
      this.messages.push(data);
    });
  }


}
