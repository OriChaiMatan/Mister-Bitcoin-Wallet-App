import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap, timer  } from 'rxjs';
import { storageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  TRADE_VOLUME_KEY = 'tradeVolume'

  BITCOIN_PRICE_HISTORY_KEY = 'bitcoinPriceHistory';

  constructor(private http: HttpClient) { }

  getRateStream(coins: number) {
      return timer(0, 1000 * 60).pipe(
          switchMap((idx) => this.getRate(coins))
      )
  }

  getRate(coins: number) {
      return this.http.get<string>(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
  }

  getTradeVolume() {
      const data = storageService.load(this.TRADE_VOLUME_KEY)
      // console.log('data service', data);

      if (data) return of(data)
      return this.http.get<{ values: [{ x: number, y: any }] }>(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
          .pipe(map(res => {
              //prepare the data in a way that the chart can render
              const vals = res.values.map(item => { return { name: new Date(item.x * 1000).toLocaleDateString("en-US"), value: item.y } })
              storageService.store(this.TRADE_VOLUME_KEY, vals)
              return vals
          }))
  }

  getBitcoinPriceHistory() {
    const data = storageService.load(this.BITCOIN_PRICE_HISTORY_KEY);

    if (data) return of(data);

    return this.http.get<{ values: [{ x: number, y: number }] }>(`https://api.blockchain.info/charts/market-price?timespan=all&format=json&cors=true`)
      .pipe(map(res => {
        const formattedData = res.values.map(item => ({
          name: new Date(item.x * 1000).toLocaleDateString("en-US"),  // Convert timestamp to date
          value: item.y                                                // Price in USD
        }));
        storageService.store(this.BITCOIN_PRICE_HISTORY_KEY, formattedData);
        return formattedData;
      }));
  }

}

