import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroesService } from './heroes.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
  public heroes$ = this.service.heroes;

  constructor(private readonly service: HeroesService) {}

  public ngOnInit(): void {
    this.service.loadHeroes().pipe(take(1)).subscribe();
  }

  public deleteHero(hero: Hero): void {
    this.service.deleteHero(hero).pipe(take(1)).subscribe();
  }
}
