import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  formatDate(data) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    try {
      const date = new Date(data);

      if (date.toString() != 'Invalid Date') {
        return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
      } else {
        return data
      }

    } catch (err) {
      return data;
    }

  }
}
