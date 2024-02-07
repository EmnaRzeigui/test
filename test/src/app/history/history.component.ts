import { Component } from '@angular/core';
import { EmailService } from '../email.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {


  emailHistory: any[] = [];

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    this.emailHistory = this.emailService.getHistory();
  }

}
