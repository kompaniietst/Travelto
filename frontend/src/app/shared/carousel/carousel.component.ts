import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  readonly URL = environment.apiUrl;
  
  defaultConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  currentSlide = 1;

  @Input() id: string;
  @Input() slides: string[];
  @Input() config = this.defaultConfig;
  @Input() needCountSlides: boolean;
  @Input() thumbnailsConfig = {
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    cssEase: 'linear',
    autoplay: true,
    arrows: false,
    draggable: true,
    focusOnSelect: true,
  };

  constructor(private ls: LocalStorageService) {}

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
