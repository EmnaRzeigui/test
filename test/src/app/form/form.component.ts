// ce composant permet d'afficher les élèments du tableau
// il permet d'ajouter, supprimer et modifier des lignes
// et permet de déplacer les cellules 


import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  //Liste des cellules ajoutées dans le tableau
  items: any[] = [];  

  //bloquer l'accès à la modification des cases
  isEditing: boolean = false;  
  
  

   
  constructor() {
    // initialiser la liste items
    this.items.push({ user: '', matricule: '', email: '' });
    
    
  }
  
  
  //supprimer la dernière ligne ajoutée au tableau
  onDelete() {
    if (confirm('Voulez-vous vraiment supprimer la dernière ligne ?')) {
      this.items.splice(-1); 
    }
  }



  //autoriser l'accès à la modification des cellules
  onModify(): void {
    this.isEditing = !this.isEditing; 
  }
  

  //ajouter une ligne au tableau
  onAdd() {
    this.items.push({ user: '', matricule: '', email: '' });
  }

  
  // gèrer la logique de déplacement des éléments dans une liste lorsque l'utilisateur effectue un glisser-déposer.
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer.id === event.container.id) {
      // Si l'élément est déplacé à l'intérieur de la même liste :
      // Utilise la fonction moveItemInArray() fournie par Angular CDK pour réorganiser les éléments dans la même liste.
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      // Si l'élément est déplacé d'une liste à une autre :
      // Utilise la fonction transferArrayItem() fournie par Angular CDK pour transférer l'élément d'une liste à une autre.
        
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  //assurer que l'adresse mail ajoutée est dans un format valide
  isValidEmail(email: string): boolean {
    const emailForm = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailForm.test(email);
  }
  
  //bloquer le déplacement de la cellule que si tous les champs sont remplis
  isItemComplete(item: any): boolean {
    return item.user && item.matricule && this.isValidEmail(item.email);
  }
  
  
  
  


 
}


