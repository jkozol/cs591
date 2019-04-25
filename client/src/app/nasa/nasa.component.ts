import { Component } from '@angular/core';
import { NasaService, Nasa } from '../nasa.service';

@Component({
  templateUrl: './nasa.component.html'
})

export class NasaComponent {
  nasa: Nasa;

  constructor(private nasaServ: NasaService) {}

  ngOnInit() {
    this.nasaServ.getNasaPic().subscribe(response => {
      this.nasa = response;
    }, (err) => {
      console.error(err);
    });
  }
}
