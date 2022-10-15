import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {StorageService} from "../../services/storage.service";


@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private storageService: StorageService) { }

  ngOnInit(): void {
  }


}
