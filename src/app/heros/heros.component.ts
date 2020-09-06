import { Component, OnInit } from '@angular/core';

import { Hero } from '../interfaces/heroes.interface';
import { HeroService } from '../services/hero.service';


@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
  styles: ['color: red'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroSVC: HeroService) {
    // use constructor for simple initialization
    // don't fetch anything from service here
    // use ngOnInit()
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroSVC.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();

    if(!name) {
      return;
    }

    this.heroSVC.addHero({name} as Hero).subscribe(
      hero => {
        this.heroes.push(hero);
      }
    )
  }

  delete(hero: Hero): void {
    this.heroSVC.deleteHero(hero).subscribe(
      (_) => {
        this.heroes = this.heroes.filter(h => h !== hero);
      }
    )
  }

}
