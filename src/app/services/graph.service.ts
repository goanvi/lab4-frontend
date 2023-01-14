import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  rValue:number

  constructor() { }

  changeRText(rValue:number) {
    this.rValue = parseFloat(rValue.toString())
    console.log(this.rValue)
    const rlablesWhole = document.querySelectorAll(".graph-label.r-whole-pos");
    const rlablesHalf = document.querySelectorAll(".graph-label.r-half-pos");
    const rlablesNegWhole = document.querySelectorAll(".graph-label.r-whole-neg");
    const rlablesNegHalf = document.querySelectorAll(".graph-label.r-half-neg");
    rlablesWhole.forEach((el) => (el.textContent = this.rValue ? this.rValue.toString() : "R"));
    rlablesHalf.forEach(
      (el) => (el.textContent = this.rValue / 2 ? (this.rValue / 2).toString() : "R/2")
    );
    rlablesNegWhole.forEach((el) => (el.textContent = -this.rValue ? (-this.rValue).toString() : "-R"));
    rlablesNegHalf.forEach(
      (el) => (el.textContent = -(this.rValue / 2) ? (-(this.rValue / 2)).toString() : "-R/2")
    );
  }
}
