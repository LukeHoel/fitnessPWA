import { Component } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent {
  statCategories: any[];
  stats: any[];
  statValues: any = {};

  constructor(private statsService: StatsService) {
    this.statCategories = statsService.getStatCategories();
    this.stats = statsService.getStats();
    this.statValues = statsService.getStatValues();
  }

  save(): void {
    this.statsService.setStatValues(this.statValues);
  }
}
