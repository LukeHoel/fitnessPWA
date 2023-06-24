import { Component } from '@angular/core';
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

  constructor(statsService: StatsService) {
    this.statCategories = statsService.getStatCategories();
    this.stats = statsService.getStats();
    this.statValues = statsService.getStatValues();
  }
}
