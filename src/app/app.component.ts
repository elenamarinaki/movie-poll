import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Movie Poll';
  svgs: {top: string, left: string}[] = [];
  svgTransforms: string[] = [];

  constructor() { }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrolled = window.scrollY;
    const parallaxFactor = 0.5;  // Adjust as needed: < 1 for slower, > 1 for faster
    const translation = scrolled * parallaxFactor;

    for (let i = 0; i < this.svgTransforms.length; i++) {
      this.svgTransforms[i] = `translateY(-${translation}px)`;
    }
  }

  ngOnInit() {
    this.generateSvgPositions();
  }

  generateSvgPositions() {
    const numberOfSvgs = 60;

    for (let i = 0; i < numberOfSvgs; i++) {
      const top = Math.random() * 100 + '%';
      const left = Math.random() * 100 + '%';
      this.svgs.push({top, left});
      this.svgTransforms.push('');
    }
  }
}
