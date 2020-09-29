import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { Heroe } from 'src/app/model/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = []
  cargando = false

  constructor( private _heroesService: HeroesService ) { }

  ngOnInit(): void {

    this.cargando = true

    this._heroesService.getHeroes()
        .subscribe( resp => {
          this.heroes = resp
          this.cargando = false
        })

  }


  borrarHeroe( heroe: Heroe , i: number ){

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ heroe.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      // si el value es true , eligio si
      if( resp.value ){
        this.heroes.splice(i, 1)
  
        this._heroesService.borrarHeroe( heroe.id,  )
              .subscribe()
      }

    })

    

  }



}
