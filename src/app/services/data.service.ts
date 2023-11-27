import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private currentRowData: any;
  constructor() { }

  setCurrentRowData(data: any) {
    this.currentRowData = data;
  }

  getCurrentRowData() {
    return this.currentRowData;
  }
}
