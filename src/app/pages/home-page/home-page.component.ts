import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service'; 

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  user: any; 
  bitcoinRate: number = 0;

  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.getBitcoinRate();
  }

  getBitcoinRate(): void {
    this.bitcoinService.getRate(this.user.coins).subscribe(rate => {
      this.bitcoinRate = rate;
    });
  }
}
