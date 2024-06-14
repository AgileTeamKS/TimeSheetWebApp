import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IEmployeeCalendarDTOAdd } from '../../interfaces/EmployeeCalendar/EmployeeCalendarInsert';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCalendarInsertService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ){}

  insertEmployeeCalendarData(record: any): Observable<IEmployeeCalendarDTOAdd> {
    const userDetail = this.authService.getUserDetail();
    console.log(record);
    if(userDetail){
      const username = userDetail.email;
      const dataWithUserName = {...record, username};
      // console.log(username);
      console.log(dataWithUserName);
      return this.http.post<IEmployeeCalendarDTOAdd>(`${this.apiUrl}EmployeeCalendar/Add`, dataWithUserName);
    }
    else{
      throw new Error('Username not found in token');
    }
  }
}
