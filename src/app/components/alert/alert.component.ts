import {Component, OnInit} from '@angular/core';
import {ErrorService} from "../../services/error.service";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  constructor(public errorService: ErrorService) {
  }

  error = false
  message: string = ''

  ngOnInit(): void {
    this.errorService.error$.subscribe(error => {
      if (error === '') {
        this.error = false

      } else {
        this.message = error
        this.error = true
      }
    })
  }



  closeAlert() {
    this.error = false
  }

}
