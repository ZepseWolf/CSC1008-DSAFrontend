import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { HttpService } from 'src/app/services/http.service';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { PopoutService } from 'src/app/services/popout.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit{
  @ViewChild("userMode")userMode!: ElementRef;
  @ViewChild("devMode")devMode!: ElementRef;

  map: any; allLayer: any; routeLayer: any; prevLayer: any; compLayer: any; vertexLayer: any; points: any;
  pickup: any;
  destination: any;
  taxiDist: any;
  prevroute: any;
  allroute: any;
  list: any;
  compList: any;
  events: string[] = [];
  color: any;
  timeoutcount: number = 0;
  
  devSwitch:any = true;
  point1:any = null;
  point2:any = null;

  pickupIcon = new L.Icon({
    iconUrl: 'assets/img/user-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [40, 41],
    iconAnchor: [18, 37],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  carIcon = new L.Icon({
    iconUrl: 'assets/img/car.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [40, 41],
    iconAnchor: [20, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  destinationIcon = new L.Icon({
    iconUrl: 'assets/img/destination-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [40, 41],
    iconAnchor: [20, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  dest2 = new L.Icon({
    iconUrl: 'assets/img/destination-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [40, 41],
    iconAnchor: [20, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  car2Icon = new L.Icon({
    iconUrl: 'assets/img/grab-car.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [40, 41],
    iconAnchor: [20, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  

  constructor(
    private _httpService : HttpService,
    private _popoutService: PopoutService
  ) { }

  public postalForm:FormGroup = new FormGroup({
    pickup:new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    destination:new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  });

  public demoForm:FormGroup = new FormGroup({
    start:new FormControl('', [Validators.required, Validators.min(1), Validators.max(79)]),
    end:new FormControl('', [Validators.required, Validators.min(1), Validators.max(79)])
  });

  ngOnInit(): void {
    this.loadMap();
    this.get_all();
    this.routeLayer = L.layerGroup();
    this.allLayer = L.layerGroup();
    this.prevLayer = L.layerGroup();
    this.compLayer = L.layerGroup();
    this.vertexLayer = L.layerGroup();
  }

  private loadMap(): void {
    this.map = L.map('map').setView([1.3800, 103.8489], 13);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
      minZoom: 13,
      maxZoom: 18,
      bounds: [[1.56073, 104.11475], [1.16, 103.502]],
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,&copy; <a href="https://openrouteservice.org/">OpenRouteService</a> openrouteservice</a>'
    }).addTo(this.map);
  }
    

  public submit_form():void {
    this._httpService.postPostal(this.postalForm).subscribe(
      (response: any) => {
        this.pickup =  response["pickup"];
        this.destination = response["destination"];
        console.log(response["taxiDist"]);
        this.taxiDist = response["taxiDist"];
        this.compList = response["comproute"];
        this.list = response["newRoute"];
        this.prevroute = response["prevRoute"]
        this.drawLine();
      },
      (e:any)=>{
        console.log(e)
        this.timeoutcount++;
        console.log(this.timeoutcount)
        if (this.timeoutcount > 5) {
          this.timeoutcount = 0;
          this._popoutService.setMessage("Invalid postal code or request timeout. Please try again");
        }
        else {
          this.submit_form();
        }
      }
    )
  }
 

  public drawLine(): void {
    if (this.list != null)  {
      console.log(this.list);
      this.deleteLine();
      this.routeLayer.addLayer(L.polyline(this.list, {color: 'red', weight: 5, opacity: 0.7})).addTo(this.map);
      this.plot_prev();
      this.map.flyToBounds(L.polyline(this.list).getBounds());
      this.routeLayer.addLayer(L.marker(this.pickup,{icon: this.pickupIcon})).addTo(this.map);
      this.routeLayer.addLayer(L.marker(this.list[0][0],{icon: this.carIcon})).addTo(this.map);
      this.routeLayer.addLayer(L.marker(this.destination,{icon: this.destinationIcon})).addTo(this.map);
      this._popoutService.setMessage((`The taxi is ${(this.taxiDist/1000).toFixed(1)}km away. Estimated time of arrival:  ${(this.taxiDist/1000).toFixed(0)} - ${(this.taxiDist/1000*1.5).toFixed(0)}  mins.` ));
    }
  }

  public deleteLine(): void {
    this.routeLayer.clearLayers();
    this.map.removeLayer(this.routeLayer);
  }

  public deleteComp(): void {
    this.compLayer.clearLayers();
    this.map.removeLayer(this.compLayer)
  }

  public deletePrev(): void {
    this.prevLayer.clearLayers();
    this.map.removeLayer(this.prevLayer)
  }

  public deleteAllRoute(): void {
    this.allLayer.clearLayers();
    this.map.removeLayer(this.allLayer)
  }

  public plot_test(): void {
    console.log(this.compList)
    for (let index = 0; index < this.compList.length; index++) {
       this.compLayer.addLayer(L.marker(this.compList[index][0],{icon: this.car2Icon})).addTo(this.map);
      this.compLayer.addLayer(L.marker(this.compList[index][(this.compList[index]).length-1],{icon: this.dest2})).addTo(this.map);
      this.compLayer.addLayer(L.polyline(this.compList[index], {color: 'green', weight: 2,opacity: 0.3})).addTo(this.map); 
      this.map.flyToBounds(L.polyline(this.compList).getBounds())
    }
  }
  
  public plot_prev(): void {
     this.routeLayer.addLayer(L.marker(this.compList[this.prevroute][this.compList[this.prevroute].length-1], {icon: this.dest2})).addTo(this.map);
      this.routeLayer.addLayer(L.polyline(this.compList[this.prevroute], {color: 'blue', weight: 5,opacity: 0.5})).addTo(this.map); 
    }

  public plot_all(): void {
    for (let index = 0; index < this.allroute.length; index++) {
      this.allLayer.addLayer(L.polyline(this.allroute[index], {color: 'green', weight: 2, opacity: 0.3})).addTo(this.map);
    }
  }


  public get_all(): void {
    this._httpService.getAll().subscribe(
      (response: any) => {
        this.allroute = response
      }
    )
  }

  public activate_dev_mode():void{
    if(this.devSwitch){
      this.devSwitch= false;
    }
    else{
      this.devSwitch = true;
    }
  }
  
  public get_vertex(): void {
    this._httpService.getVertex().subscribe(
      (response: any) => {
        this.points = response
        console.log(response)
        for (let index = 0; index < this.points['vertex'].length; index++) {
          this.vertexLayer.addLayer(L.marker(this.points['vertex'][index],{icon: this.dest2})).addTo(this.map);
        }
        for (let index = 0; index < this.points['listing'].length; index++) {
          this.vertexLayer.addLayer(L.polyline(this.points['listing'][index]['route'], {color: 'green', weight: 1, opacity: 0.7})).addTo(this.map);
        }
      }
    )
  }

  public deleteVertex(): void {
    this.map.removeLayer(this.vertexLayer);
  }


  public submit_form_demo():void {
    this._httpService.postDemo(this.demoForm).subscribe(
      (response: any) => {
        this.taxiDist = response["distance"];
        console.log(response["distance"]);
        this.list = response["route"];
        this.drawDemo();
      },
      (e:any)=>{
        this._popoutService.setMessage("Invalid postal code or request timeout. Please try again");
      }
    )
  }

  public drawDemo(): void {
    if (this.list != null)  {
      this.routeLayer.addLayer(L.polyline(this.list, {color: 'blue', weight: 5, opacity: 0.7})).addTo(this.map);
      this.map.flyToBounds(L.polyline(this.list).getBounds());
      this.routeLayer.addLayer(L.marker(this.list[0],{icon: this.carIcon})).addTo(this.map);
      this.routeLayer.addLayer(L.marker(this.list[this.list.length-1],{icon: this.destinationIcon})).addTo(this.map);
         this._popoutService.setMessage((`The taxi is ${(this.taxiDist/1000).toFixed(1)}km away. Estimated time of arrival:   ${(this.taxiDist/1000 / 60 * 60).toFixed(1) } - ${(this.taxiDist /1000 / 60 * 60 *1.5).toFixed(0)}  mins.` ));
    }
  }
}
