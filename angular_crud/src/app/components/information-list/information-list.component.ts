import { Component, OnInit, ViewChild } from '@angular/core';
import { informationModel } from 'src/app/model/informationmodel';
import {  MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from 'src/app/shared/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as alertify from 'alertifyjs'
@Component({
  selector: 'app-information-list',
  templateUrl: './information-list.component.html',
  styleUrls: ['./information-list.component.scss']
})
export class InformationListComponent implements OnInit {
  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  informationData!: informationModel[];
  finaldata:any;


  ngOnInit(): void {
    this.LoadCompany();
  }

  displayColums: string[] = ["id", "name", "phone", "email",  "action"]

  openPopUp(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '550px',
      exitAnimationDuration: '500ms',
      enterAnimationDuration: '500ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadCompany();
    });
  }

  LoadCompany() {
    this.api.getAllInformation().subscribe(response => {
      this.informationData = response;
      this.finaldata=new MatTableDataSource<informationModel>(this.informationData);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  EditCompany(id: any) {
    this.openPopUp(id);
  }

  removeInformation(id:any){
    alertify.confirm("Remove Information", "do you want remove this information?", () => {
      this.api.removeInformationbyId(id).subscribe(r => {
        this.LoadCompany();
      });
    }, function () {

    })

  }



}
