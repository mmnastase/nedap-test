import { Component, signal } from '@angular/core';
import { GnomesService } from '../gnomes.service';
import { combineLatest, Observable, map, startWith, shareReplay, scan, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-gnome-list',
  templateUrl: './gnome-list.component.html',
  styleUrl: './gnome-list.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    MatSlideToggleModule, MatInputModule, MatButtonToggleModule, MatExpansionModule
    , MatCardModule, MatPaginatorModule
  ]
})
export class GnomeListComponent {

  public readonly gnomes$: Observable<any>
  public readonly professions$: Observable<string[]>

  readonly panelOpenState = signal(false);
  readonly page = new BehaviorSubject([0, 20]);

  public readonly searchControl = new FormControl('')
  public readonly professionsControl = new FormControl()
  public readonly results$: Observable<any[]>;
  public readonly paginatedResults$: Observable<any[]>;
  public readonly resultsLength$: Observable<number>;

  constructor(private readonly gnomeService: GnomesService) {
    this.gnomes$ = this.gnomeService.getGnomeData().pipe(
      map(data => data.Brastlewark as any[]),
      shareReplay(1)
    );

    const terms$ = this.searchControl.valueChanges.pipe(startWith(''))

    this.professions$ = this.gnomes$.pipe(scan((profSet, gnomes) => {
      gnomes.forEach((gnome: any) => gnome.professions.forEach((p: any) => profSet.add(p)))
      return profSet
    }, new Set()), map(set => Array.from(set) as string[]))

    const professionsFilter$ = this.professionsControl.valueChanges.pipe(startWith([]))

    this.results$ = combineLatest([this.gnomes$, terms$, professionsFilter$]).pipe(
      map(([gnomes, term, professionFilter]) => {
        return gnomes.filter((g: any) => {
          const profMatch = professionFilter.length === 0 ? true : !!g.professions.find((p: string) => p == professionFilter)
          return profMatch && g.name.toLowerCase().includes((term ? term : '').trim().toLowerCase())
        })
      })
    )
    this.resultsLength$ = this.results$.pipe(
      map(results => results.length)
    )
    this.paginatedResults$ = combineLatest([
      this.page,
      this.results$
    ]).pipe(map(([page, results]) => {
      const [start, end] = page
      return results.slice(start, end);
    }))
  }

  handlePageEvent(event: PageEvent) {
    this.page.next([(event.pageIndex * event.pageSize), (event.pageIndex + 1) * event.pageSize])
  }
}