import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Heroe } from '../model/heroe.model'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroes-c5ae9.firebaseio.com'

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: Heroe ){

    return this.http.post( `${ this.url }/heroes.json`, heroe )
        .pipe(
          map( (resp: any) => {
            heroe.id = resp.name;
            return heroe
          })
        )
  }


  actualizarHeroe( heroe: Heroe ){

    const heroeTemp = {
      ... heroe
    }

    delete heroeTemp.id

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp )

  }


  getHeroe( id: string ){

    return this.http.get(`${ this.url}/heroes/${ id }.json` )

  }



  getHeroes(){

    return this.http.get(`${ this.url}/heroes.json` )
        .pipe(
          //map( resp => this.crearArreglo( resp ) ) es igual a
          map( this.crearArreglo )
        )
  }


  private crearArreglo( heroesObj: object ){

    const heroes: Heroe[] = []

    if( heroesObj === null ) {
      return [];
    }

    Object.keys( heroesObj ).forEach( key => {

      const heroe: Heroe = heroesObj[key]

      heroe.id = key

      heroes.push( heroe )
    })

    return heroes
  }



  borrarHeroe( id: string ){

    return this.http.delete(`${ this.url}/heroes/${ id }.json` )
    
  }


  
}
