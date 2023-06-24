import { Injectable } from '@angular/core';
import { StatCategory } from '../models/stat-category';
import { Stat } from '../models/stat';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor() { }

  getStatCategories(): StatCategory[] {
    const defaultStatCategories: StatCategory[] = [
      { id: 'strength', name: 'Strength' },
      { id: 'endurance', name: 'Endurance' },
      { id: 'speed', name: 'Speed' },
      { id: 'body-composition', name: 'Body Composition' },
      { id: 'flexibility', name: 'Flexibility' },
      { id: 'agility', name: 'Agility' }
    ];

    return this.getItem('statCategories', defaultStatCategories);
  }

  getStats(): Stat[] {
    let defaultStats: Stat[] = [
      // Strength Exercises
      { categoryId: 'strength', id: 'overhead-press', name: 'Overhead Press (lbs)', goodValue: 135, badValue: 45, lowerIsBetter: false },
      { categoryId: 'strength', id: 'bench-press', name: 'Bench Press (lbs)', goodValue: 225, badValue: 45,  lowerIsBetter: false },
      { categoryId: 'strength', id: 'squat', name: 'Squat (lbs)', goodValue: 315, badValue: 45, lowerIsBetter: false },
      { categoryId: 'strength', id: 'deadlift', name: 'Deadlift (lbs)', goodValue: 405, badValue: 45, lowerIsBetter: false },
      // Endurance Exercises
      { categoryId: 'endurance', id: 'longest-run', name: 'Longest Run (km)', goodValue: 22, badValue: 0, lowerIsBetter: false },
      // Speed Exercises
      { categoryId: 'speed', id: 'fastest-100m', name: 'Fastest 100m (s)', goodValue: 11, badValue: 15, lowerIsBetter: true },
      { categoryId: 'speed', id: 'fastest-mile', name: 'Fastest mile (m)', goodValue: 5, badValue: 9.5, lowerIsBetter: true },

      // Body Composition
      { categoryId: 'body-composition', id: 'body-fat', name: 'Body Fat (%)', goodValue: 10, badValue: 25,lowerIsBetter: true },
      { categoryId: 'body-composition', id: 'ffmi', name: 'Fat Free Mass Index (ffmi)', goodValue: 23, badValue: 16, lowerIsBetter: false },
      // Flexibility
      { categoryId: 'flexibility', id: 'sit-and-reach', name: 'Sit and Reach (cm)', goodValue: 40, badValue: 23, lowerIsBetter: false },
      // Agility
      { categoryId: 'agility', id: 'jump-height', name: 'Jump Height (cm)', goodValue: 60, badValue: 21, lowerIsBetter: false }
    ]

    return this.getItem('stats', defaultStats);
  }

  getStatValues(): any {
    return this.getItem('statValues', {});
  }

  setStatValues(newValues: any): void {
    let statValues: any = {};
    Object.keys(newValues).filter(key => !!newValues[key]).forEach(key => statValues[key] = newValues[key]);
    localStorage.setItem('statValues', JSON.stringify(statValues));
  }

  private getItem(key: string, defaultValue: any) {
    let value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return defaultValue;
  }
}
