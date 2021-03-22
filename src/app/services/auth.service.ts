import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$ = new BehaviorSubject({
    username: null,
    isAuthenticated: false
  });

  constructor(
    private http: HttpClient
  ) { }

  login({username, password}) {
    return this.http.post('/login', {
      username,
      password
    });
  }
}
