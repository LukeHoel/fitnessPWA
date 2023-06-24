import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-stats-view',
  templateUrl: './stats-view.component.html',
  styleUrls: ['./stats-view.component.scss']
})
export class StatsViewComponent {
  statCategories: any[];
  stats: any[];
  statValues: any = {};

  radarChartOptions: ChartOptions<'radar'> = {
      responsive: true,
      maintainAspectRatio: true,
    
      scales: {
        r: {
          ticks: {
            display: false // Hides the labels in the middel (numbers)
          }
        }
      }
  }

  radarChartLabels: string[] = [];
  radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [];

  showGeneralizedRadar: boolean = true;

  constructor(statsService: StatsService) {
    this.statCategories = statsService.getStatCategories();
    this.stats = statsService.getStats();
    this.statValues = statsService.getStatValues();

    this.setRadarValues();
  }

  setRadarValues(): void {

    let scaledStats = this.stats.map(stat => ({
      ...stat,
      scaledValue: this.scaleValue(this.statValues[stat.id] || stat.badValue, stat.badValue, stat.goodValue)
    }));

    if(this.showGeneralizedRadar) {
      this.radarChartLabels = this.statCategories.map(statCategory => statCategory.name);
      this.radarChartDatasets = [{ data: this.statCategories.map(statCategory => 
        this.calculateMean(
          scaledStats
            .filter(stat => stat.categoryId === statCategory.id)
            .map(stat => stat.scaledValue)
          )
      ) }];

    } else {
      this.radarChartLabels = this.stats.map(stat => stat.name);
      this.radarChartDatasets = [{ data: scaledStats.map(stat => stat.scaledValue) }];
    }

  }

  private scaleValue(value: number, low: number, high: number) {
    // Calculate the range between low and high
    var range = high - low;
    
    // Scale the value between 0 and 1
    var scaledValue = (value - low) / range;
    
    // Scale the value between 1 and 100
    var scaledRange = 100 - 1;
    var scaledResult = scaledValue * scaledRange + 1;
    
    // Round the scaled result to the nearest integer
    return Math.round(scaledResult);
  }

  private calculateMean(numbers: number[]) {
    if (numbers.length === 0) {
      return 0; // Handle empty array
    }
  
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const mean = sum / numbers.length;
  
    return mean;
  }
}
