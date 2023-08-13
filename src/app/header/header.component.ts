import { Component, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  lastScrollTop = 0;
  isHidden = false;
  constructor(public el: ElementRef, private router: Router) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop > this.lastScrollTop) {
      this.hideHeader();
    } else {
      this.showHeader();
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  hideHeader() {
    this.el.nativeElement.querySelector('.header').style.transform = 'translateY(-100%)';
    this.isHidden = true;
  }

  showHeader() {
    this.el.nativeElement.querySelector('.header').style.transform = 'translateY(0)';
    this.isHidden = false;
  }

  navigateHome(): void {
    this.router.navigate(['/']).then(data => console.log('navigation promise --- ', data));
  }

  showRecords(): void {
    this.router.navigate(['/records']).then(data => console.log('navigation promise --- ', data));
  }
}
