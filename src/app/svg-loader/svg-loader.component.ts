import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-svg-loader',
  templateUrl: './svg-loader.component.html',
  styleUrls: ['./svg-loader.component.css']
})
export class SvgLoaderComponent implements OnInit {
  @Input() svgName: string;
  svgContent: SafeHtml;

  private basePath: string = 'assets/svg/';
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnInit() {
    this.loadSvg(this.basePath + this.svgName + '.svg');
  }

  loadSvg(url: string) {
    this.http.get(url, {responseType: 'text'})
      .subscribe(data => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(data);
      });
  }
}
