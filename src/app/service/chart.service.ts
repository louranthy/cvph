import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public ofwGenderUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public localGenderUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public locationUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
