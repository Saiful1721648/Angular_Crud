import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api.service';


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
      this.api.getInformationById(this.data.id).subscribe(response => {
        this.editdata = response;
        this.companyform.setValue({
          id: this.editdata.id, name: this.editdata.name, phone:this.editdata.phone, email:this.editdata.email
        });
      });
    }
  }

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),

  });

  SaveCompany() {
    if (this.companyform.valid) {
      const Editid = this.companyform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateInformation(Editid, this.companyform.getRawValue()).subscribe(response => {
          this.closepopup();
         alert("Updated successfully.")
        });
      } else {
        this.api.createInformation(this.companyform.value).subscribe(response => {
          this.closepopup();
          alert("saved successfully.")
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }


}
