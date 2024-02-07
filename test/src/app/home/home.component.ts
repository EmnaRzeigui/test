import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  showMessage: boolean = false;

  dropList: any[]=[];

  predefinedMessage: string = "Bonjour @User voici votre matricule  @Matricule";

  
  

  constructor(private emailService:EmailService) {
  }
   

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
  

  

  displayMessage() {
    this.showMessage = !this.showMessage;
  }


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

   

  ngOnInit() :void{
  }


  


 
  

  
}

