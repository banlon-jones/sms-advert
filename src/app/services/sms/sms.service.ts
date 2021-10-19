import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor() { }

  send(contacts: any, name: string, message: string): any{
    alert('sent');
  }
}
