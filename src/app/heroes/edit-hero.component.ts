import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';

import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})


export class EditHeroComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
  });

  private get hero(): Hero {
    const id = this.heroForm.get('id')?.value!;
    const name = this.heroForm.get('name')?.value!;
    const description = this.heroForm.get('description')?.value!;
    return {
      id: parseInt(id, 10),
      name,
      description,
    };
  }
  private set hero(hero: Hero) {
    this.heroForm.get('id')?.setValue(hero.id + '');
    this.heroForm.get('name')?.setValue(hero.name);
    this.heroForm.get('description')?.setValue(hero.description);
  }

  constructor(
    private readonly service: HeroesService,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        take(1),
        map((params) => parseInt(params.get('id')!, 10)),
        mergeMap((heroId) => this.service.getHero(heroId)),
        tap((hero) => (this.hero = hero)),
      )
      .subscribe();
  }

  public onSubmit(): void {
    this.service
      .modifyHero(this.hero, this.hero.id)
      .pipe(
        take(1),
        tap(() => this.location.back()),
      )
      .subscribe();
  }
}
