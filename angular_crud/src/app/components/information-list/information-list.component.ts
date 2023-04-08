import { Component, OnInit, ViewChild } from '@angular/core';
import { informationModel } from 'src/app/model/informationmodel';
@Component({
  selector: 'app-information-list',
  templateUrl: './information-list.component.html',
  styleUrls: ['./information-list.component.scss']
})
export class InformationListComponent implements OnInit {
  constructor(){}
  tabledata!:informationModel[];
  ngOnInit(): void {

  }
  displayColums: string[] = ["_id", "name", "phone", "email", "action"]

}
