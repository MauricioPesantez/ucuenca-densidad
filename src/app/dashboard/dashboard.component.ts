import { Component, OnInit, NgModule } from '@angular/core';
import * as Chartist from 'chartist';
import {FormsModule, FormBuilder} from "@angular/forms";
import { MatSliderModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isShow=false
  constructor() { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      
      
  } 
  /* VARIABLES DE CALCULO Y OBTENCION DE DATOS */
  opcionMedida=1
  seleccionMedida=0
  hectareasTotales
  sueloUtil
  sueloVivienda
  ocultar=true
  medidaMinimaSueloUtil = 0.2

  capturarMedida(){
    //seleccion de unidad de medida
    this.seleccionMedida = this.opcionMedida
    //alert(this.seleccionMedida)
  }

  getHectareas(){

    if(typeof this.hectareasTotales == 'undefined')return 0
    else return (this.hectareasTotales*this.opcionMedida)
  }

  seleccionMedidaNoUrbanizable = [1,1,1,1,1,1,1]
  /*opciones de suelu no urbanizable*/
  opcionLimitacionesTopograficas=0.0001
  opcionAreasPaisaje=0.0001
  opcionAreasHistorico=0.0001
  opcionVias=0.0001
  opcionRios=0.0001
  opcionFallasGeologicas=0.0001
  opcionAgricultura=0.0001


  
  capturarMedidaNoUrbanizable(){

    this.seleccionMedidaNoUrbanizable[0] = this.opcionLimitacionesTopograficas    
    this.seleccionMedidaNoUrbanizable[1] = this.opcionAreasPaisaje
    this.seleccionMedidaNoUrbanizable[2] = this.opcionAreasHistorico
    this.seleccionMedidaNoUrbanizable[3] = this.opcionVias
    this.seleccionMedidaNoUrbanizable[4] = this.opcionRios
    this.seleccionMedidaNoUrbanizable[5] = this.opcionFallasGeologicas
    this.seleccionMedidaNoUrbanizable[6] = this.opcionAgricultura
  }

  onClickCharacteristics(){
    if(this.isShow) this.isShow=false
    else this.isShow=true
  }





  // llenada de superfices no utilizables
  limitacionesTopograficas=0
  areasPaisaje=0
  areasHistorico=0
  vias=0
  rios=0
  fallasGeologicas=0
  agricultura=0
  constanteSuelo:number = 0

  calcularSueloUrbanizable(valor){
    this.constanteSuelo = valor
    if(typeof this.agricultura == 'undefined' && 
    typeof this.areasPaisaje == 'undefined' &&
    typeof this.areasHistorico == 'undefined' &&
    typeof this.vias == 'undefined' &&
    typeof this.rios == 'undefined' &&
    typeof this.fallasGeologicas == 'undefined' &&
    typeof this.limitacionesTopograficas == 'undefined') alert("Debe completar todos los campos")
    else{
      
      this.sueloUtil =  (this.hectareasTotales - ((this.limitacionesTopograficas*this.seleccionMedidaNoUrbanizable[0]) + 
                                            (this.areasPaisaje*this.seleccionMedidaNoUrbanizable[1]) + (this.areasHistorico*this.seleccionMedidaNoUrbanizable[2]) 
                                            + (this.vias*this.seleccionMedidaNoUrbanizable[3]) + (this.rios*this.seleccionMedidaNoUrbanizable[4]) + 
                                            (this.fallasGeologicas*this.seleccionMedidaNoUrbanizable[5]) + (this.agricultura*this.seleccionMedidaNoUrbanizable[6]))) * this.opcionMedida

      /* SI EL SUELO CALCULADO ES NEGATIVO, O SE ENCUENTRA BAJO METRICAS DE MEDIDAS, ENTONCES NO SERÁ POSIBLE
      EL CALCULO */
      if(this.sueloUtil<this.medidaMinimaSueloUtil && this.sueloUtil>0){
        alert("La cantidad de Suelo Útil no alcanza las medidas mínimas reglamentarias")
      }

      else if(this.sueloUtil<=0){
        alert("Error. Los datos ingresados sobrepasan el valor del suelo inicial!!!")
      }

      else{
        this.ocultar=false
        /**Calculo de los datos  */
        this.sueloVivienda = this.sueloUtil*this.constanteSuelo        
        this.densidadNeta = this.poblacion / this.sueloVivienda
        this.numLotes = this.densidadNeta/4
        this.areaLotes = this.sueloVivienda / this.numLotes
      }

    }

  }
 
  poblacion
  densidadNeta=0
  numLotes
  areaLotes
  composicionFamiliar=4
  numeroLotesTotales

  getInteger(){
    this.densidadNeta = Math.trunc(this.densidadNeta)
    this.numLotes = Math.trunc(this.numLotes)
    this.areaLotes = Math.trunc(this.areaLotes)
    this.poblacion = Math.trunc(this.poblacion)
  }

  calculoDensidad(){
    this.densidadNeta = this.poblacion / this.sueloVivienda
    this.numLotes = this.densidadNeta/this.composicionFamiliar
    this.areaLotes = (10000 / this.numLotes)
    this.numeroLotesTotales = this.numLotes*this.sueloVivienda
    this.getInteger()
  }

  calculoPoblacion(){
    this.poblacion = this.densidadNeta * this.sueloVivienda
    this.numLotes = this.densidadNeta/this.composicionFamiliar
    this.areaLotes = (10000 / this.numLotes)
    this.numeroLotesTotales = this.numLotes*this.sueloVivienda
    this.calculoLotes()
    this.getInteger()
  }
  calculoValores(){
    this.calcularSueloUrbanizable(this.constanteSuelo)
    this.calculoDensidad()
    this.calculoPoblacion()
  }
  
  /* Calculo de lotes medio-minimo-maximo */
  loteMedio;
  loteMinimo;
  loteMaximo;
  calculoLotes(){
    this.loteMedio = this.areaLotes
    this.loteMinimo = this.loteMedio*0.9
    this.loteMaximo = this.loteMedio*1.1
  }

}
