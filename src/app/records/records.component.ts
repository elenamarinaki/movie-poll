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
  chartOptions:Highcharts.Options;
  palette = ['#b3de95', '#9b95de', '#de95b2', '#9bdfce', '#df9bce', '#dfac9b']


  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.recordsService
      .getRecords()
      .subscribe((data: Record[]) => {
        console.log('Records are: ', data)
        this.allRecords = data;

        this.chartOptions = {
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
              text: 'Number of people'
            }
          },
          series: [{
            name: 'Genre',
            data: this.getGenreNumberPairs().map((p, idx) => ({y: Object.values(p)[0] as number, color: this.palette[idx % 6]})),
            type: 'column',
            color: '#7ddcc6'
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

}
