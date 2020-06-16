import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  defaultConfig = {
    slidesToShow: 1,
    slidesToScroll: 1
  };

  currentSlide = 1;

  @Input() slides: string[];
  @Input() config = this.defaultConfig;
  @Input() needCountSlides: boolean;

  constructor() { }

  slickInit(e) {
    // console.log('slick initialized');
  }

  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    this.currentSlide = e.currentSlide + 1;
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }

  countSlides() {
    return this.needCountSlides ? this.slides.length : 0
  }
  ngOnInit(): void {
  }

}
