// ce composant permet d'afficher l'historique des emails envoyés .
// utilise les informations envoyées à partir du service EmailService.


import { Component } from '@angular/core';
import { EmailService } from '../email.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  //liste pour stocker l'historique.
  emailHistory: any[] = [];
  

  //injecter le service EmailService dans le composant via le constructeur.
  constructor(private emailService: EmailService) { }


  // Méthode du cycle de vie d'Angular appelée après l'initialisation du composant.
  ngOnInit(): void {

    //appeler la méthode getHistory du service EmailService pour récupérer l'historique des e-mails envoyés.
    this.emailHistory = this.emailService.getHistory();
  }

}
