import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  getUserRents(): number[] {
    return [13223, 32132];
  }
}
