import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '../../core/services/alert-message.service';

class Message { type: string; text: string }

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  message: Message;

  constructor(
    private alertMessageService: AlertMessageService
  ) {
    this.alertMessageService.subject
      .subscribe(x => {
        this.message = x;
      })
  }

  ngOnInit(): void {
  }

}
