import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {FormsModule, FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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

  convertirUnidades(){
  
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
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 25]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 60, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
      
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
  }

  getHectareas(){
    return (this.hectareasTotales*this.opcionMedida)
  }
  // llenada de superfices no utilizables
  limitacionesTopograficas
  areasPaisaje
  areasHistorico
  vias
  rios
  fallasGeologicas
  agricultura
  constanteSuelo:number
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
      
      this.sueloUtil =  (this.hectareasTotales - (parseInt(this.limitacionesTopograficas) + parseInt(this.areasPaisaje) + 
      parseInt(this.areasHistorico) + parseInt(this.vias) + parseInt(this.rios) + parseInt(this.fallasGeologicas) + parseInt(this.agricultura))) * this.opcionMedida

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
  densidadNeta
  numLotes
  areaLotes

  calculoDensidad(){
    this.densidadNeta = this.poblacion / this.sueloVivienda
    this.numLotes = this.densidadNeta/4
    this.areaLotes = this.sueloVivienda / this.numLotes
  }

  calculoPoblacion(){
    this.poblacion = this.densidadNeta * this.sueloVivienda
    this.numLotes = this.densidadNeta/4
    this.areaLotes = this.sueloVivienda / this.numLotes
  }
  
}
