import { Injectable } from '@angular/core';
import {IMark} from "../models/mark";
import {MarkService} from "./mark.service";
import {count} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  page = 1;
  pageSize = 4;
  collectionSize:number
  marks: IMark[];

  constructor(private markService: MarkService) {
  }

  refreshMarks() {
    this.markService.getPage(this.page-1, this.pageSize)
      .subscribe(marks =>{
        if (marks.length !=0){
          marks.forEach(mark =>{
            mark.time = (new Date(mark.time + 'Z')).toLocaleString('ru')
          })
        }
        this.marks = marks
      })
  }

  clearTable(){
    this.markService.deleteAll()
      .subscribe(() => {
        this.refreshTable()
        this.refreshMarks()
      })
  }

  refreshTable(){
    this.markService.countMarks().subscribe(count => {
      this.collectionSize = count
      this.page = count/this.pageSize + 1
    })
  }

}
