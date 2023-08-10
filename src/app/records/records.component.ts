import {OnInit, Component } from '@angular/core';
import { RecordsService } from "../records.service";
import * as Highcharts from 'highcharts';

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
  genrePalette = ['#b3de95', '#9b95de', '#de95b2', '#9bdfce', '#df9bce', '#dfac9b']
  seasonPalette = ['#9BDFCE', '#B3DE95', '#D15340', '#C1D3FD']


  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.recordsService
      .getRecords()
      .subscribe((data: Record[]) => {
        console.log('Records are: ', data)
        this.allRecords = data;

        this.genrePopularityChartOptions = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Genre popularity',
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
            color: '#7ddcc6'
          }]
        };

        this.seasonPopularityChartOptions = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Season popularity',
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
              text: 'Number of movies'
            }
          },
          series: [{
            name: 'Season',
            data: this.getMoviesPerSeason().map((m, idx) => ({y: m as number, color: this.seasonPalette[idx]})),
            type: 'column',
            color: '#B3DE95'
          }]
        };
      });

    // Highcharts.setOptions({
    //   chart: {
    //     style: {
    //       fontFamily: 'monospace'
    //     }
    //   }
    // });


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

}
