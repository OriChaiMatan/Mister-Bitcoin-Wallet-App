import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BitcoinService } from '../../services/bitcoin.service';

interface Trade {
  name: string
  value: number
}

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  lineChartData: any[] = [];
  filteredData: any[] = [];
  selectedRange: '7day' | 'month' | 'year' | 'five-years' | 'all' = 'five-years';
  chartView: [number, number] = [900, 400];

  constructor(private bitcoinService: BitcoinService) { }

  ngOnInit(): void {
    this.bitcoinService.getBitcoinPriceHistory().subscribe(data => {
      this.lineChartData = [
        {
          name: 'Bitcoin Price',
          series: data
        }
      ];
      this.filterData(); // Initial filter
      this.updateChartView();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateChartView();
  }


  setTimeRange(range: '7day' | 'month' | 'year' | 'five-years' | 'all') {
    this.selectedRange = range;
    this.filterData();
  }

  filterData() {
    const now = new Date();
    let startDate: Date;

    switch (this.selectedRange) {
      case '7day':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Last 24 hours
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'five-years':
        startDate = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate()); // Last 5 years
        break;
      case 'all':
      default:
        this.filteredData = this.lineChartData;
        return;
    }

    this.filteredData = [
      {
        name: 'Bitcoin Price',
        series: this.lineChartData[0].series.filter((dataPoint: any) => {
          const dataDate = new Date(dataPoint.name);
          return dataDate >= startDate;
        })
      }
    ];
  }

  updateChartView(): void {
    const width = window.innerWidth;
    const height = 400; // Default height

    this.chartView = [width / 2, height]; // Adjust width based on screen size
  }

}
