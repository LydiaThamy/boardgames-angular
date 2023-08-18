import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnChanges, OnDestroy {

  @Input() limit: number
  @Input() offset: number

  subs$: Subscription
  games: string[]

  constructor(private service: GameService) { }

  // games will initialise on startup and when limit/offset is changed
  ngOnChanges() {
    this.service.setLimitOffset(this.limit, this.offset)
    this.getGames()
  }

  getGames() {
    this.games = []
    this.subs$ = this.service.getGamesFromApi()
      .subscribe({
        next: result => {
          Object.entries(result).forEach(game => {
            this.games.push(game[1].name)
          })
        }
      })
      console.log(this.subs$)
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe
  }

}
