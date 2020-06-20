import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-google-map-marker',
  templateUrl: './google-map-marker.component.html',
  styleUrls: ['./google-map-marker.component.scss']
})
export class GoogleMapMarkerComponent implements OnInit {

  @Input() google: any;
  @Input() map: any;
  @Input() lat: number;
  @Input() lng: number;
  markerObj;

  ngOnInit() {
    if (this.google) {
      const Marker = this.google.maps.Marker;
      this.markerObj = new Marker({
        position: { lat: this.lat, lng: this.lng },
        map: this.map
      });
    }
  }

  ngOnDestroy() {
    if (this.markerObj)
      this.markerObj.setMap(null);
  }
}
