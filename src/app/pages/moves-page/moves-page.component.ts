import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { Router } from '@angular/router';
import { Move } from '../../models/move.model';

@Component({
  selector: 'moves-page',
  templateUrl: './moves-page.component.html',
  styleUrl: './moves-page.component.scss'
})
export class MovesPageComponent implements OnInit {
  user!: User;
  moves$: Observable<Move[]> = of([]);

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.userService.getUser(); 

  if (!user) {
    this.router.navigate(['/signup']);
    return; 
  }

  this.user = user as User;
  this.moves$ = of(this.user.moves.reverse());
  }
}
