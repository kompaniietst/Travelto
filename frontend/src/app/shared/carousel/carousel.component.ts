import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  defaultConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  currentSlide = 1;

  @Input() id: string;
  @Input() slides: string[];
  @Input() config = this.defaultConfig;
  @Input() needCountSlides: boolean;
  @Input() thumbnailsConfig;


  // this.carouselConfig["asNavFor"] = ".carousel.thumbnail" + this.room.id;
  // this.thumbnailsConfig["asNavFor"] = ".carousel.img" + this.room.id;


  constructor() { }

  slickInit(e) { }

  breakpoint(e) { }

  afterChange(e) {
    this.currentSlide = e.currentSlide + 1;
  }

  beforeChange(e) { }

  countSlides() {
    return this.needCountSlides ? this.slides.length : 0
  }

  ngOnInit(): void {
    if (this.thumbnailsConfig && this.id) {
      this.config["asNavFor"] = ".carousel.thumbnail" + this.id;
      this.thumbnailsConfig["asNavFor"] = ".carousel.img" + this.id;
    }
  }

  trackById(index, item) {
    return item.id;
  }
}
