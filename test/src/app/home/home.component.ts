// ce composant permet d'afficher la page d'acceuil 
// il contient le message prédéfini et assure l'envoi des messages aux destinataires 

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // Indique si la section de message est actuellement affichée ou masquée.
  showMessage: boolean = false;
  
  predefinedMessage: string = "Bonjour @User voici votre matricule  @Matricule";
   
  // liste des cellules déplacées
  dropList: any[]=[];

  
  
  //injecter le service EmailService dans le composant via le constructeur.
  constructor(private emailService:EmailService) {
  }


  // afficher ou masquer la section du message 
  displayMessage() {
    this.showMessage = !this.showMessage;
  }
   
  
  // Logique de réorganisation des messages lors d'un glisser-déposer.
  drop(event: CdkDragDrop<string[]>) {
    // console.log(event)
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  


  // envoyer un mail pour chaque utilisateur entré
  sendEmails() {

    console.log(this.dropList)
    this.dropList.forEach(item => {
      const messageBody = this.predefinedMessage
          .replace('@User', item.user)
          .replace('@Matricule', item.matricule);

      this.emailService.sendEmail(item.email, 'Your Subject Here', messageBody)
        .subscribe(response => {
          console.log('Email sent successfully:', response);
        }, error => {
          console.error('Error sending email:', error);
        });
    });
  }

   

  


  


 
  

  
}

