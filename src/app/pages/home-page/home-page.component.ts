import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  BTC!: string;
  user!: User;
  BTC$!: Observable<string>;

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
  this.BTC$ = this.bitcoinService.getRateStream(this.user.coins);
  }

}
