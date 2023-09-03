import { OnInit, Component } from '@angular/core';
import { RecordsService } from "../records.service";
import * as Highcharts from 'highcharts';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { Record } from "../record";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  allRecords: Record[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  genrePopularityChartOptions:Highcharts.Options;
  seasonPopularityChartOptions:Highcharts.Options;
  genrePopularityPerSeasonChartOptions:Highcharts.Options;
  genrePalette = ['#006275', '#019B9D', '#F09C00', '#CC6600', '#BC3C00', '#9B2226']
  seasonPalette = ['#94D2BD', '#EE9B00', '#9B2226', '#005F73']

  recordsForm: FormGroup;
  genres: string[] = [
    'Please select',
    'action',
    'comedy',
    'drama',
    'horror',
    'romance',
    'sci-fi',
    'animation',
    'mystery',
    'crime',
    'thriller'
  ];

  allMovies: string;

  constructor(private recordsService: RecordsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.recordsService
      .getRecords()
      .subscribe((data: Record[]) => {
        this.allRecords = data;
        this.allMovies = data.map(r => r.favouriteMovie).join(', ');

        this.genrePopularityChartOptions = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Chart 1 - Genre popularity in total',
            align: 'left'
          },
          xAxis: {
            categories: this.getGenreNumberPairs().map(p => Object.keys(p)[0]),
            crosshair: true,
            accessibility: {
              description: 'Countries'
            }
          },
          yAxis: {
            className: 'highcharts-color-0',
            title: {
              text: 'Number of votes'
            }
          },
          series: [{
            name: 'Genre',
            data: this.getGenreNumberPairs().map((p, idx) => ({y: Object.values(p)[0] as number, color: this.genrePalette[idx % 6]})),
            type: 'column',
            color: '#0A9396'
          }]
        };

        this.seasonPopularityChartOptions = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Chart 2 - Season popularity in total',
            align: 'left'
          },
          xAxis: {
            categories: ['spring', 'summer', 'fall', 'winter'],
            crosshair: true,
            accessibility: {
              description: 'Seasons'
            }
          },
          yAxis: {
            className: 'highcharts-color-0',
            title: {
              text: 'Number of votes'
            }
          },
          series: [{
            name: 'Season',
            data: this.getMoviesPerSeason().map((m, idx) => ({y: m as number, color: this.seasonPalette[idx]})),
            type: 'column',
            color: '#EE9B00'
          }]
        };

        this.genrePopularityPerSeasonChartOptions = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Chart 3 - Genre popularity per season',
            align: 'left'
          },
          xAxis: {
            categories: ['spring', 'summer', 'fall', 'winter'],
            crosshair: true,
            accessibility: {
              description: "Seasons"
            }
          },
          yAxis: {
            className: 'highcharts-color-0',
            title: {
              text: 'Number of votes'
            }
          },
          series: [{
            name: 'Season',
            data: this.getGenreNumberPerSeason(this.genres[0]).map((m, idx) => ({y: m as number, color: this.seasonPalette[idx]})),
            type: 'column',
            color: '#CA6702'
          }]
        }
      });


    Highcharts.setOptions({
      chart: {
        style: {
          fontFamily: 'monospace'
        }
      }
    });

    this.recordsForm = this.fb.group({
      genre: [this.genres[0], [Validators.required]],
    });

    this.recordsForm.get('genre').valueChanges.subscribe((value) => {
      this.genrePopularityPerSeasonChartOptions = {
        ...this.genrePopularityPerSeasonChartOptions,
        title: {
          text: `Chart 3 - ${value.charAt(0).toUpperCase() + value.slice(1)} genre popularity per season`,
          align: 'left'
        },
        series: [{
          name: 'Season',
          data: this.getGenreNumberPerSeason(value).map((m, idx) => ({y: m as number, color: this.seasonPalette[idx]})),
          type: 'column',
          color: '#CA6702'
        }]
      }
    });
  }

  getGenreNumber(genre: string): number {
    return this.allRecords.filter((r: Record) => r.genre === genre).length
  }

  getGenreNumberPairs() {
    return this.allRecords.map(r => ({[r.genre]: this.getGenreNumber(r.genre)})).reduce((acc, current) => {
      const key = Object.keys(current)[0];
      const index = acc.findIndex(item => Object.keys(item)[0] === key);
      if (index < 0) {
        acc.push(current);
      }
      return acc;
    }, []);
  }

  getMoviesPerSeason(): number[] {
    const springLength = this.allRecords.filter((r: Record) => r.season === 'spring').length;
    const summerLength = this.allRecords.filter((r: Record) => r.season === 'summer').length;
    const fallLength = this.allRecords.filter((r: Record) => r.season === 'fall').length;
    const winterLength = this.allRecords.filter((r: Record) => r.season === 'winter').length;

    return [springLength, summerLength, fallLength, winterLength]
  }

  getGenreNumberPerSeason(genre: string): number[] {
    const springLength = this.allRecords.filter((r: Record) => r.season === 'spring' && r.genre === genre).length;
    const summerLength = this.allRecords.filter((r: Record) => r.season === 'summer' && r.genre === genre).length;
    const fallLength = this.allRecords.filter((r: Record) => r.season === 'fall' && r.genre === genre).length;
    const winterLength = this.allRecords.filter((r: Record) => r.season === 'winter' && r.genre === genre).length;

    return [springLength, summerLength, fallLength, winterLength]
  }
}
