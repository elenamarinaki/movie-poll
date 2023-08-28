import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  questionnaireButton: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // this.questionnaireButton = this.renderer.selectRootElement('.navigation-btn', true)
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#EE9B00ab', '');
    this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'none');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null, null);
    this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'underline');
  }

  private highlight(bgcolor: string, color: string) {
    this.el.nativeElement.style.backgroundColor = bgcolor;
    this.el.nativeElement.style.color = color;
    this.el.nativeElement.style.borderRadius = '5px';
    this.el.nativeElement.style.padding = '5px 0';
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.transition = 'all 0.3s ease-in-out';
  }
}
