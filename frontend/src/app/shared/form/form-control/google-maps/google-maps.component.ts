import { Component, OnInit, ViewChild, ElementRef, Input, ContentChild, TemplateRef } from '@angular/core';
import GoogleMapsApiLoader from "google-maps-api-loader";

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild('mapContainer') mapContainer: ElementRef;
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  @Input() key: string;
  @Input() mapLat;
  @Input() mapLng;
  @Input() zoom: number;
  google;
  map;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    GoogleMapsApiLoader({
      apiKey: this.key
    }).then(googleMapApi => {
      this.google = googleMapApi;
      const mapContainer = this.mapContainer.nativeElement;
      this.map = new this.google.maps.Map(mapContainer, {
        zoom: this.zoom,
        center: { lat: this.mapLat, lng: this.mapLng }
      });
    })
  }
}
