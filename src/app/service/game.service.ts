import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subscription, firstValueFrom, map } from 'rxjs';
import { Games } from '../model/Games';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  http = inject(HttpClient)
  url: string = "https://day35workshopserver-production.up.railway.app/games"
  // url: string = "http://localhost:8080/games"

  limit: number
  offset: number

  // games: string[] = []

  setLimitOffset(limit: number, offset: number) {
    this.limit = limit
    this.offset = offset
  }

  getGamesFromApi(): Observable<Object> {

    if (this.limit === undefined)
      this.limit = 25

    if (this.offset === undefined)
      this.offset = 0

    let queryParams: HttpParams = new HttpParams()
      .set("limit", this.limit)
      .set("offset", this.offset)

    return this.http.get(this.url, { params: queryParams })
      .pipe(
        map(data => data["games"])
      )

    // Using model to map results
    // this.sub$ = this.http.get<Games>(this.url, { params: this.queryParams })
    // this.sub$ = this.http.get(this.url, { params: this.queryParams })
    //   .subscribe({
    //     next: data => {

    //       // console.log(data)
    //       /*
    //       games: (25) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    //       limit: 25
    //       offset: 0
    //       timestamp: "Fri Aug 18 13:59:08 SGT 2023"
    //       total: 17065
    //       */

    //      // data.games.forEach(game => {
    //        //   this.games.push(game.name)
    //        // });

    //        data["games"].forEach(game => {
    //          this.games.push(game.name)
    //        });
    //     },
    //     error: err => console.error(err)
    //   })

  }
}
