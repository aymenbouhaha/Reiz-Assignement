import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {fromLonLat} from "ol/proj";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,  AfterViewInit{

  constructor() { }

  @Input() lat : number
  @Input() lng : number
  @ViewChild('mapContainer', { read: ElementRef }) mapContainer: ElementRef;

  private map: Map;


  ngOnInit(): void {
  }

  private initializeMap() {
    const centerCoordinates = fromLonLat([this.lng, this.lat]); // Example: New York City coordinates

    this.map = new Map({
      target: this.mapContainer.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: centerCoordinates,
        zoom: 5
      }),
      controls: []
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap()
  }


}
