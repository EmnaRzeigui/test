import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  items: any[] = [];
  isEditing: boolean = false;
  cellList:any[]=[];
  
  
  

   
  constructor() {
    // Ajoutez des objets initiaux si nécessaire
    this.items.push({ user: '', matricule: '', email: '' });
    
    
  }
  
  

  onDelete() {
    if (confirm('Voulez-vous vraiment supprimer la dernière ligne ?')) {
      this.items.splice(-1); // Supprime l'élément du tableau à l'indice spécifié
    }
  }

  onModify(): void {
    this.isEditing = !this.isEditing;
  }

  onAdd() {
    this.items.push({ user: '', matricule: '', email: '' });
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


  isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email);
  }
  

  isItemComplete(item: any): boolean {

  
    return item.user && item.matricule && this.isValidEmail(item.email);



  }
  
  
  
  


 
}


