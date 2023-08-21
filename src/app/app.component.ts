import {Component, OnInit, HostListener, OnDestroy} from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Movie Poll';
  svgs: {top: string, left: string}[] = [];
  svgTransforms: string[] = [];

  showHeader = false;
  private routerSub: Subscription;

  constructor(private router: Router) { }

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

    this.routerSub = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event)  => {
      const navigationEnd  = event as NavigationEnd;
      this.showHeader = navigationEnd.url !== '/'
    });
  }

  generateSvgPositions() {
    const numberOfSvgs = 57;

    for (let i = 0; i < numberOfSvgs; i++) {
      const top = Math.random() * 100 + '%';
      const left = Math.random() * 100 + '%';
      this.svgs.push({top, left});
      this.svgTransforms.push('');
    }
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
