import { Component, OnInit, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { SizeDetectorService } from 'src/app/core/services/size-detector.service';

@Component({
  selector: 'app-size-detector',
  templateUrl: './size-detector.component.html',
  styleUrls: ['./size-detector.component.scss']
})
export class SizeDetectorComponent implements OnInit, AfterViewInit {

  @HostListener("window:resize", [])
  private onResize() {
    this.detectScreenSize();
  }

  detectScreenSize() {
    this.service.onResize(window.innerWidth)
  }

  constructor(private service: SizeDetectorService) { }

  ngAfterViewInit(): void {
    this.detectScreenSize()
  }

  ngOnInit(): void {
  }

}
