import {AfterViewInit, Component} from '@angular/core';
import {TableService} from "../../services/table.service";
import {MarkService} from "../../services/mark.service";
import {GraphService} from "../../services/graph.service";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-mark-graph',
  templateUrl: './mark-graph.component.html',
  styleUrls: ['./mark-graph.component.scss']
})
export class MarkGraphComponent implements AfterViewInit{
  xLine:Element
  yLine:Element
  graph: Element|null
  limit = {
    xMax: 5,
    xMin: -5,
    yMax: 3,
    yMin: -3,
    rMax: 5,
    rMin: 0
  }
  constructor(public tableService: TableService,
              private markService: MarkService,
              private graphService: GraphService,
              private errorService: ErrorService) {
  }

  ngAfterViewInit(): void {
    this.yLine = document.querySelector("#y-line") as Element
    this.xLine = document.querySelector('#x-line') as Element
  }

  addMark(){
    if (isNaN(this.graphService.rValue) || this.graphService.rValue.toString() == ''){
      this.errorService.handle("You need to enter the R value")
    }
    else{
      const x = +(((parseFloat(this.xLine.getAttribute("x1") as string) - 150) / 100) * this.graphService.rValue).toFixed(1);
      const y = -(((parseFloat(this.yLine.getAttribute("y1") as string)- 150) / 100) * this.graphService.rValue).toFixed(1);
      const r = this.graphService.rValue;
      this.markService.addMark({
        xvalue: x as number,
        yvalue: y as number,
        rvalue: r as number
      }).subscribe(()=>{
        this.tableService.refreshTable()
      })
    }
  }

  refreshLines(e: MouseEvent){
    if (isNaN(this.graphService.rValue) || this.graphService.rValue.toString() == ''){
      this.hideLines()
    }
    else {
      const coord = e.offsetY - 20 * (e.offsetY / 320);
      this.yLine.setAttribute("stroke", "red");
      const highLimit = this.limit.yMax * 100 / this.graphService.rValue;
      const lowLimit = -(this.limit.yMin * 100 / this.graphService.rValue);
      if (coord > 150) {
        this.yLine.setAttribute("y1", coord <= 150 + lowLimit ? coord.toString() : (150 + lowLimit).toString());
        this.yLine.setAttribute("y2", coord <= 150 + lowLimit ? coord.toString() : (150 + lowLimit).toString());
      } else {
        this.yLine.setAttribute("y1", coord >= 150 - highLimit ? coord.toString() : (150 - highLimit).toString());
        this.yLine.setAttribute("y2", coord >= 150 - highLimit ? coord.toString() : (150 - highLimit).toString());
      }
      const coordX = e.offsetX - 20 * (e.offsetX / 320);
      this.xLine.setAttribute("stroke", "red");
      const highLimitX = this.limit.xMax * 100 / this.graphService.rValue;
      const lowLimitX = -(this.limit.xMin * 100 / this.graphService.rValue);
      if (coordX > 150) {
        this.xLine.setAttribute("x1", coordX <= 150 + highLimitX ? coordX.toString() : (150 + highLimitX).toString());
        this.xLine.setAttribute("x2", coordX <= 150 + highLimitX ? coordX.toString() : (150 + highLimitX).toString());
      } else {
        this.xLine.setAttribute("x1", coordX >= 150 - lowLimitX ? coordX.toString() : (150 - lowLimitX).toString());
        this.xLine.setAttribute("x2", coordX >= 150 - lowLimitX ? coordX.toString() : (150 - lowLimitX).toString());
      }
    }
  }

  hideLines(){
    this.yLine.setAttribute("stroke", "transparent");
    this.xLine.setAttribute("stroke", "transparent");
  }

}
