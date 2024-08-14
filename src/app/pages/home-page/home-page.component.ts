import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { Router } from '@angular/router';
import { Move } from '../../models/move.model';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  BTC!: string;
  user!: User;
  BTC$!: Observable<string>;
  moves$: Observable<Move[]> = of([]);
  bitcoin: string = '';


  constructor(
    private bitcoinService: BitcoinService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.userService.getUser(); 

  if (!user) {
    this.router.navigate(['/signup']);
    return; 
  }

  this.user = user as User; // Assert that user is of type User

  console.log(this.user);

  this.bitcoinService.getBitcoinPrice().subscribe(
    data => this.bitcoin = this.formatCurrency(data.bitcoin.usd),
    error => console.error('Error fetching Bitcoin price', error)
  );

  this.BTC$ = this.bitcoinService.getRateStream(this.user.coins);
  this.moves$ = of(this.user.moves.slice(-5).reverse());
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }

}
