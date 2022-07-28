import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero } from './hero';
import { HeroesService } from './heroes.service';
import { take } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})


export class NewHeroComponent {

  public newHeroForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  private get hero(): Hero {
    const name = this.newHeroForm.get('name')?.value!;
    const description = this.newHeroForm.get('description')?.value!;
    return {
      name,
      description,
    } as Hero;
  }

  constructor(
    private readonly service: HeroesService,
    private readonly location: Location,
  ) {}

  public onSubmit(): void {
    this.service
      .createHero(this.hero)
      .pipe(
        take(1),
        tap(() => this.location.back()),
      )
      .subscribe();
  }

}
