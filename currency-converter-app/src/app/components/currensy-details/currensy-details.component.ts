import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currensy-details',
  templateUrl: './currensy-details.component.html',
  styleUrls: ['./currensy-details.component.scss']
})
export class CurrensyDetailsComponent implements OnInit {


  result: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
