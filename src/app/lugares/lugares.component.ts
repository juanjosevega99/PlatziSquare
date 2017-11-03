import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  animations: [
  	trigger('contenedorAnimable', [
  		state('inicial', style({
  			opacity: 0
  		})),
  		state('final', style({
  			opacity: 1
  		})),
  		transition('inicial => final', animate(2000)),
  		transition('final => inicial', animate(1000)),
  	])  	 
  ]
})
export class LugaresComponent {
	title = 'PlatziSquare';
	state = 'inicial'

	lat:number = 2.450005;
	lng:number = -76.5938616;
	lugares = null;
	animar(){
		this.state = (this.state == 'final') ? 'inicial' : 'final'
	}
	animacionInicia(e){
		console.log('Iniciado!')
		console.log(e)
	}
	animacionTermina(e){
		console.log('Terminado!')
		console.log(e)
	}
	constructor(private lugaresService: LugaresService) {
		lugaresService.getLugares()
			.valueChanges()
	      	.subscribe(lugares => {		      	
	        this.lugares = lugares;
	        var me = this;
	        me.lugares = Object.keys(me.lugares).map(function (key) { return me.lugares[key]; });	        	 	        
	        this.state = 'final'
    	}, error => {
    		console.log(error)
    		alert('Tenemos algo de dificulatades, dsculpe las molestias. Error: '+ error.statusText)
    	});
	}
}
