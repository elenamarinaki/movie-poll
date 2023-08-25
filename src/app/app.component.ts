import {Component, OnInit, HostListener, OnDestroy} from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import {Subscription} from "rxjs";
import {WindowService} from "./window.service";

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

  viewportWidth: number;
  viewportHeight: number;

  constructor(private router: Router, private windowService: WindowService) { }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrolled = window.scrollY;
    const parallaxFactor = 0.5;  // Adjust as needed: < 1 for slower, > 1 for faster
    const translation = scrolled * parallaxFactor;

    for (let i = 0; i < this.svgTransforms.length; i++) {
      this.svgTransforms[i] = `translateY(-${translation}px)`;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.viewportWidth = this.windowService.nativeWindow.innerWidth;
    this.viewportHeight = this.windowService.nativeWindow.innerHeight;

    this.svgs = [];
    this.generateSvgPositions();

  }


  ngOnInit() {
    this.routerSub = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event)  => {
      const navigationEnd  = event as NavigationEnd;
      this.showHeader = navigationEnd.url !== '/'
    });

    this.viewportWidth = this.windowService.nativeWindow.innerWidth;
    this.viewportHeight = this.windowService.nativeWindow.innerHeight;

    this.generateSvgPositions();
  }

  generateSvgPositions() {
    const gap = 180;
    const offset = 50;

    let columns = 0;
    let rows = 0;

    if (this.viewportWidth > this.viewportHeight) {
      columns = Math.ceil(this.viewportWidth / gap);
      rows = Math.ceil(this.viewportHeight / gap * 2);
    } else {
      columns = Math.ceil(this.viewportWidth / gap * 2);
      rows = Math.ceil(this.viewportHeight / gap);
    }


    for (let i = 0; i < rows; i++) {
      let top = '';
      for (let j = 0; j < columns; j++) {
        let left = '';
        if (j % 2 === 0) {
          top = i * gap/this.viewportWidth * 100 + '%';
          left = j * gap/this.viewportWidth * 100 + '%';
        } else {
          top = i * (gap + offset)/this.viewportWidth * 100 + '%';
          left = j * gap/this.viewportWidth * 100 + '%';
        }
        this.svgs.push({top, left});
        this.svgTransforms.push('');
      }
    }
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
