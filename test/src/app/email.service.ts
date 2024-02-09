// Ce service permet d'envoyer un email 
// enregistrer les détails de l'email 

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

    // avoir la date actuelle sous le format ISO (e.g., '2024-02-07T12:30:00.000Z')
    const currentDate = new Date().toISOString();  

    // envoyer l'email par http request
    return this.http.post<any>('http://localhost:8000/send-email/', { to, subject, body })
      .pipe(
        tap(response => {
          // ajouter les détails de l'email à l'historique 
          const emailDetails = { to, subject, body, status: response.success ? 'Sent' : 'Failed', sentAt: currentDate };
          this.addToHistory(emailDetails);
        })
      );
  }

  addToHistory(emailDetails: any) {
    // ajouter les détail de l'historique au stockage local 
    let emailHistory: any[] = JSON.parse(localStorage.getItem('emailHistory') || '[]');
    emailHistory.unshift(emailDetails);
    localStorage.setItem('emailHistory', JSON.stringify(emailHistory));
  }

  getHistory() {
    // récuperer l'historique à partir du stockage local
    return JSON.parse(localStorage.getItem('emailHistory') || '[]');
  }
}
