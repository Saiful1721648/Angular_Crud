import { Component, OnInit, ViewChild } from '@angular/core';
import { informationModel } from 'src/app/model/informationmodel';
import {  MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from 'src/app/shared/api.service';
@Component({
  selector: 'app-information-list',
  templateUrl: './information-list.component.html',
  styleUrls: ['./information-list.component.scss']
})
export class InformationListComponent implements OnInit {
  constructor(private dialog: MatDialog,private api: ApiService,
   ){}

  tabledata!:informationModel[];
  ngOnInit(): void {
    this.loadInformation();

  }
  displayColums: string[] = ["id", "name", "phone", "email", "action"]
  Openpopup(id:any){
   const _popUp= this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '500ms',
      enterAnimationDuration: '500ms',
      data: {
        id: id
      }
    })
    _popUp.afterClosed().subscribe(r=>{
      this.loadInformation();

    })
  }
  loadInformation(){
    this.api.getAllInformation().subscribe(response=>{
      this.tabledata=response;
    })

  }
  editInformation(id:any){
    this.Openpopup(id)

  }

}
