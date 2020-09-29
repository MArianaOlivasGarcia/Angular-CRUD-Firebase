import { Component, OnInit } from '@angular/core'
import { Heroe } from 'src/app/model/heroe.model'
import { NgForm } from '@angular/forms'
import { HeroesService } from 'src/app/services/heroes.service'
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new Heroe();

  constructor( private _heroesService: HeroesService,
               private _activatedRoute: ActivatedRoute  ) { }

  ngOnInit(): void {

    const id = this._activatedRoute.snapshot.paramMap.get('id')

    if( id !== 'nuevo' ){
      this._heroesService.getHeroe( id )
          .subscribe( (resp: Heroe) => {
            this.heroe = resp
            this.heroe.id = id
          })
    }

  }


  guardar( form: NgForm ){

    if( form.invalid ){
      //console.log('Formulario no valido')
      return
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacíon',
      icon: 'info',
      allowOutsideClick: false
    })

    Swal.showLoading()
    

    if( this.heroe.id ){

      this._heroesService.actualizarHeroe( this.heroe )
            .subscribe( resp => {
              
              Swal.fire({
                title: this.heroe.nombre,
                text: 'Actualizado correctamente',
                icon: 'success'
              })

            })

    } else {

      this._heroesService.crearHeroe( this.heroe )
            .subscribe( resp => {
              // console.log( resp )
              this.heroe = resp
              Swal.fire({
                title: this.heroe.nombre,
                text: 'Guardado correctamente',
                icon: 'success'
              })
            })

    }

    // console.log(form)
    // console.log(this.heroe)
  }

}
