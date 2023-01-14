import {Component} from '@angular/core';
import {ErrorService} from "../../services/error.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MarkService} from "../../services/mark.service";
import {TableService} from "../../services/table.service";
import {GraphService} from "../../services/graph.service";

@Component({
  selector: 'app-create-mark',
  templateUrl: './create-mark.component.html',
  styleUrls: ['./create-mark.component.scss']
})
export class CreateMarkComponent {

  xMessage = 'Input x value(-5...5)'
  yMessage = 'Input y value(-3...3)'
  rMessage = 'Input r value(0...5)'

  form = new FormGroup({
    rValue: new FormControl<number | undefined>(undefined, [
      Validators.required,
      Validators.pattern(/^-?[0-9]+[.,]?[0-9]*$/),
      Validators.min(0.1),
      Validators.max(5)
    ]),
    xValue: new FormControl<number | undefined>(undefined, [
      Validators.required,
      Validators.pattern(/^-?[0-9]+[.,]?[0-9]*$/),
      Validators.min(-5),
      Validators.max(5)]
    ),
    yValue: new FormControl<number | undefined>(undefined, [
      Validators.required,
      Validators.pattern(/^-?[0-9]+[.,]?[0-9]*$/),
      Validators.min(-3),
      Validators.max(3)
    ])
  })

  constructor(public errorService: ErrorService,
              private markService: MarkService,
              private tableService: TableService,
              private graphService: GraphService) {
  }

  submit() {
    if (this.xValue.errors?.required ||
      this.yValue.errors?.required ||
      this.rValue.errors?.required) {
      this.errorService.handle("Input fields cannot be empty!")
    } else if ((this.xValue.errors ||
      this.yValue.errors ||
      this.rValue.errors)) {
    } else {
      this.markService.addMark({
        xvalue: parseFloat((this.xValue.value as number).toString().replace(',', '.')),
        yvalue: parseFloat((this.yValue.value as number).toString().replace(',', '.')),
        rvalue: parseFloat((this.rValue.value as number).toString().replace(',', '.'))
      }).subscribe(() => {
          this.tableService.refreshTable()
        }
      )
    }
  }

  validateX(e: Event) {
    if (this.xValue.errors?.pattern) {
      // @ts-ignore
      e.target.classList.add('is-invalid')
      this.xMessage = "Invalid input"
    } else if (this.xValue.errors?.max) {
      // @ts-ignore
      e.target.classList.add('is-invalid')
      this.xMessage = "Value must be less than 5"
    } else if (this.xValue.errors?.min) {
      // @ts-ignore
      e.target.classList.add('is-invalid')
      this.xMessage = "The value must be greater than -5"
    } else {
      // @ts-ignore
      e.target.classList.remove('is-invalid')
      this.xMessage = 'Input x value(-5...5)'
    }

  }

  validateY(e: Event) {
    if (this.yValue.errors?.pattern) {
      // @ts-ignore
      e.target.classList.add('is-invalid')
      this.yMessage = "Invalid input"
    } else if (this.yValue.errors?.max) {
      // @ts-ignore
      e.target.classList.add('is-invalid')
      this.yMessage = "Value must be less than 3"
    } else if (this.yValue.errors?.min) {
      // @ts-ignore
      e.target.classList.add('is-invalid')
      this.yMessage = "The value must be greater than -3"
    } else {
      // @ts-ignore
      e.target.classList.remove('is-invalid')
      this.yMessage = 'Input y value(-3...3)'
    }
  }

  validateR(e: Event) {
    if (this.rValue.errors?.pattern) {
      // @ts-ignore
      e.target.classList.add('is-invalid')
      this.rMessage = "Invalid input"
    } else if (this.rValue.errors?.max) {
      // @ts-ignore
      e.target.classList.add('is-invalid')
      this.rMessage = "Value must be less than 5"
    } else if (this.rValue.errors?.min) {
      // @ts-ignore
      e.target.classList.add('is-invalid')
      this.rMessage = "The value must be greater than 0"
    } else {
      // @ts-ignore
      e.target.classList.remove('is-invalid')
      this.rMessage = 'Input r value(0...5)'
      this.graphService.changeRText(this.rValue.value as number)
    }
  }

  get xValue() {
    return this.form.controls.xValue
  }

  get yValue() {
    return this.form.controls.yValue
  }

  get rValue() {
    return this.form.controls.rValue
  }
}
