import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { VillanoModel } from '../models/villano.model';

@Injectable({
  providedIn: 'root'
})
export class VillanosService {
  constructor(private _http: HttpClient) { }

  private url = 'https://crud-villanos-default-rtdb.firebaseio.com';
  
  crearVillano(villano: VillanoModel) {
    return this._http.post(`${this.url}/heroe.json`, villano).pipe(
      map((resp: any) => {
        villano.id = resp.name;
        return villano;
      })
    );
  }

  actualizarVillano(villano: VillanoModel) {
    
    const villanoTemp = {
      ...villano
    }

    delete villanoTemp.id;

    return this._http.put(`${this.url}/heroe/${villano.id}.json`, villanoTemp);

  }
 
  borrarVillano(id: string) {
    return this._http.delete(`${this.url}/heroe/${id}.json`);
  }
   
  getVillano(id: string) {

    return this._http.get(`${this.url}/heroe/${id}.json`);
  }

  getVillanos() {
    return this._http.get(`${this.url}/heroe.json`).pipe(
      map(this.crearArreglo)
    );
  }

  private crearArreglo(villanosOBJ: object) {
    
    const villanos: VillanoModel[] = [];

    Object.keys(villanosOBJ).forEach(key => {
      const heroe: VillanoModel = villanosOBJ[key];
      heroe.id = key;

      villanos.push(heroe);
    });

    if (villanosOBJ === null) { return []; }
    return villanos;

  }
}
