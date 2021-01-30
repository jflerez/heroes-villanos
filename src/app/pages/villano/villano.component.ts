import { Component, OnInit } from '@angular/core';

import { VillanoModel } from "../../models/villano.model";
import { VillanosService } from "../../services/villanos.service";

import  Swal  from "sweetalert2";
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-villano',
  templateUrl: './villano.component.html',
  styleUrls: ['./villano.component.css']
})
export class VillanoComponent implements OnInit {

  villano = new VillanoModel();  

  constructor(private _villanosServices: VillanosService,
              private _route:ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {

    const id = this._route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this._villanosServices.getVillano(id).subscribe((resp: VillanoModel) => {
        this.villano = resp;
        this.villano.id = id;
      });
    }

  }

  guardar( form: NgForm) {

    let accionProcess = 'guardó';
    
    if (form.invalid) {
      console.log('Formulario no valido');
      return;
    } 
    
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Informacion',
      allowOutsideClick:false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.villano.id) {
      accionProcess = 'actualizó';
      peticion = this._villanosServices.actualizarVillano(this.villano);
    } else {
      peticion = this._villanosServices.crearVillano(this.villano);
    }
    
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.villano.nombre,
        text: `Se ${accionProcess} correctamente`
      });
      this.router.navigate(["/villanos"]);

    } )


  }

}
