import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Define the response interface for the Bitcoin data
interface ChartData {
  name: string;
  data: any[];
}

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  private readonly baseUrl = 'https://api.blockchain.info/charts';

  constructor(private http: HttpClient) { }

  // Fetch current Bitcoin rate and return it as Observable
  getRate(coins: number): Observable<number> {
    const url = `${this.baseUrl}/market-price?timespan=5months&format=json&cors=true`;
    return this.http.get<any>(url).pipe(
      map(response => {
        // Extract and return the current Bitcoin rate from the response
        return response.values ? response.values[response.values.length - 1].y : 0;
      }),
      catchError(() => of(0)) // Fallback in case of error
    );
  }

  // Fetch trade volume data and return it as Promise
  getTradeVolume(): Promise<ChartData> {
    const url = `${this.baseUrl}/trade-volume?timespan=5months&format=json&cors=true`;
    return this.http.get<any>(url).toPromise().then(response => ({
      name: 'Trade Volume',
      data: response.values
    }));
  }

  // Fetch average block size data and return it as Promise
  getAverageBlockSize(): Promise<ChartData> {
    const url = `${this.baseUrl}/avg-block-size?timespan=5months&format=json&cors=true`;
    return this.http.get<any>(url).toPromise().then(response => ({
      name: 'Average Block Size',
      data: response.values
    }));
  }

  // Fetch market price data and return it as Promise
  getMarketPrice(): Promise<ChartData> {
    const url = `${this.baseUrl}/market-price?timespan=5months&format=json&cors=true`;
    return this.http.get<any>(url).toPromise().then(response => ({
      name: 'Market Price',
      data: response.values
    }));
  }
}
