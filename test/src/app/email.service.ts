import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {


  emailHistory: any[] = [];


  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, body: string) {

    const currentDate = new Date().toISOString(); // Getting the current date in ISO format (e.g., '2024-02-07T12:30:00.000Z')

    return this.http.post<any>('http://localhost:8000/send-email/', { to, subject, body })
    .pipe(
      tap(response => {
        this.addToHistory({ to, subject, body, status: response.success ? 'Sent' : 'Failed', sentAt: currentDate });
      })
    );
  }



  addToHistory(emailDetails: any) {
    this.emailHistory.push(emailDetails);
  }

  getHistory() {
    return this.emailHistory;
  }
}
