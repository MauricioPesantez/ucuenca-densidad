import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from 'app/services/firestore/firestore.service';

@Component({
  selector: 'app-characteristics-table',
  templateUrl: './characteristics-table.component.html',
  styleUrls: ['./characteristics-table.component.scss']
})
export class CharacteristicsTableComponent implements OnInit {

  @Input() tamLoteDash: number;

  public tamanos=[];

  constructor(private firebaseStore:FirestoreService) { }

  ngOnInit() {
    this.firebaseStore.getAllTamLotes().subscribe(tamanoss=>{
      console.log("Tamanos", tamanoss)
      console.log("valor lote", this.tamLoteDash)
    } )
  }

}
