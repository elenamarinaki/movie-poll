import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-description',
  templateUrl: './chart-description.component.html',
  styleUrls: ['./chart-description.component.css']
})
export class ChartDescriptionComponent implements OnInit {

  @Input() descriptionText: string;
  @Input() backgroundColour: string;
  @Input() borderPosition: "left" | "right";

  constructor() { }

  ngOnInit(): void {
  }

}
