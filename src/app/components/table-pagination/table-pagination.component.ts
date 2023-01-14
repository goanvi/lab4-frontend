import {Component, OnInit} from '@angular/core';
import {IMark} from "../../models/mark";
import {MarkService} from "../../services/mark.service";
import {TableService} from "../../services/table.service";

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent{

  constructor(public tableService: TableService) {
    this.tableService.refreshTable()
    this.tableService.refreshMarks()
  }


}
