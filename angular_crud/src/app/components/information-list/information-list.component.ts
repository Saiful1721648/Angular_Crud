import { Component, OnInit, ViewChild } from '@angular/core';
import { informationModel } from 'src/app/model/informationmodel';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-information-list',
  templateUrl: './information-list.component.html',
  styleUrls: ['./information-list.component.scss']
})
export class InformationListComponent implements OnInit {
  constructor(private dialog: MatDialog){}

  tabledata!:informationModel[];
  ngOnInit(): void {

  }
  displayColums: string[] = ["_id", "name", "phone", "email", "action"]
  Openpopup(id:any){
    this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
  }

}
