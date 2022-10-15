import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  saveStudent(student: any) {
    console.log(JSON.stringify(student));
  }
}
