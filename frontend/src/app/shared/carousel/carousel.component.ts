import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

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
  // this.carouselConfig["asNavFor"] = ".carousel.thumbnail" + this.room.id;
  // this.thumbnailsConfig["asNavFor"] = ".carousel.img" + this.room.id;


  constructor(private ls: LocalStorageService) {
 /*    this.ls.get()
      .subscribe((x: any) => {
        console.log('*x', x.city._id);

        // this.id = x.city._id;

        console.log(' ');
        
        console.log('CAROUSELLLLL');

        // if (this.thumbnailsConfig && this.id) {
        // this.config["asNavFor"] = ".carousel.thumbnail" + x.city._id;
        // this.thumbnailsConfig["asNavFor"] = ".carousel.img" + x.city._id;

        console.log('conf, thumb',this.id,this.slides, this.config, this.thumbnailsConfig);
        // }
      }) */

    // if (this.thumbnailsConfig && this.id) {
    //   this.config["asNavFor"] = ".carousel.thumbnail" + this.id;
    //   this.thumbnailsConfig["asNavFor"] = ".carousel.img" + this.id;
    // }
  }

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
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>', this.id);

    // if (this.thumbnailsConfig && this.id) {
    //   this.config["asNavFor"] = ".carousel.thumbnail" + this.id;
    //   this.thumbnailsConfig["asNavFor"] = ".carousel.img" + this.id;

    // }
  }

  trackById(index, item) {
    return item.id;
  }
}
