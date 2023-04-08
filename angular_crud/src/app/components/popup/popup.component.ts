import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';
import * as alertify from 'alertifyjs'


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.getInformationbyId(this.data.id).subscribe(response => {
        this.editdata = response;
        this.informationForm.setValue({
          id: this.editdata.id, name: this.editdata.name, phone: this.editdata.phone,
          email: this.editdata.email
        });
      });
    }
  }

  informationForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
  });

  saveInformation() {
    if (this.informationForm.valid) {
      const Editid = this.informationForm.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.updateInformation(Editid, this.informationForm.getRawValue()).subscribe(response => {
          this.closePopUp();
          alertify.success("Updated successfully.")
        });
      } else {
        this.api.createInformation(this.informationForm.value).subscribe(response => {
          this.closePopUp();
          alertify.success("saved successfully.")
        });
      }
    }
  }

  closePopUp() {
    this.dialog.closeAll();
  }

}
