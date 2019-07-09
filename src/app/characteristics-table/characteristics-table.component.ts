import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from 'app/services/firestore/firestore.service';

@Component({
  selector: 'app-characteristics-table',
  templateUrl: './characteristics-table.component.html',
  styleUrls: ['./characteristics-table.component.css']
})
export class CharacteristicsTableComponent implements OnInit {

  @Input() tamLoteDash: number;

  public tamanos=[];
  public tamMostrar
  private aux=-1
  private listaTam = [120, 150, 180, 200, 300, 350, 500, 900, 1200, 1500];

  constructor(private firebaseStore:FirestoreService){

   }

  ngOnInit() {
    this.firebaseStore.getAllTamLotes().subscribe(tamanoss=>{
      //console.log("Tamanos", tamanoss);         //eso solo muestra un objeto de tipo tamanoInterface
      console.log("valor lote", this.tamLoteDash) //muestra el numero que recive para buscar en el array de tamanos
      this.tamanos.push(tamanoss[0]);
      this.tamanos.push(tamanoss[1]);
      this.tamanos.push(tamanoss[2]);
      this.tamanos.push(tamanoss[3]);
      this.tamanos.push(tamanoss[4]);
      this.tamanos.push(tamanoss[5]);
      this.tamanos.push(tamanoss[6]);
      this.tamanos.push(tamanoss[7]);
      this.tamanos.push(tamanoss[8]);
      this.tamanos.push(tamanoss[9]);
      alert(this.tamanos.length)
    } )
    //console.log("Array a usar: ",this.tamanos)
    this.obtenerRango()
    //console.log("Nuevos",this.tamanos)

  }//init

  obtenerRango(){
    console.log("en for", this.tamanos.length)
    for(let i=0;i<(this.tamanos.length-1);i++){
      console.log(this.tamanos[i].tamanoMinimo)
      if(this.tamLoteDash>=(this.tamanos[i].tamanoMinimo) && this.tamLoteDash<this.tamanos[i+1]){
        this.aux=i;
        this.tamMostrar=this.tamanos[i]
        i=this.tamanos.length-1;
        //finBusqueda
      }
    }
    if(this.aux==-1){
      this.aux=this.tamanos.length-1
      this.tamMostrar=this.tamanos[this.tamanos.length]
    }

    console.log(this.tamMostrar)
  }
  

}
