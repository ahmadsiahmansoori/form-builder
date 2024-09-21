import { UserService } from './user.service';
import { HttpClient, HttpHeaders ,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, debounceTime, delay, map, of, switchMap, tap, timer } from 'rxjs';
import { Response } from '../interfaces/Response';
import { User } from '../interfaces/User';
import { JwtService } from './jwt.service';
import { environment } from 'src/environments/environment';
import { HttpAttempt } from '../interfaces/HttpAttempt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    // private httpClient: HttpClient,
    private userService: UserService,
    private jwtSerivce: JwtService
  ) { }


  public isGuest = true;
  private isLoginSystem = new ReplaySubject<boolean>(1);
  public isLoginSystem$ = this.isLoginSystem.asObservable();



  public login(loginForm: {username: string , password: string}): Observable<boolean> {
    return of({auth_key: 'ahmadaghathegread'}).pipe(map(data => {
      if(data.auth_key) {
        this.setToken(data.auth_key)
        return true
      }

      return false
    }))
  }

  public get attempt(): Observable<boolean> {
    const user: HttpAttempt = {
      id: 1,
      email: 'ahmad.s96736@gmail.com',
      status: 2,
      role_id: 1,
      call_number: null
    };
    return timer(4000).pipe(switchMap(_ => of(user))).pipe(map(data => {
      this.loginConf({
        id: data.id,
        email: data.email,
        status: data.status,
        roleId: data.role_id,
        callNumber: data.call_number
      })
      return true
    }))

  }


  public get getToken(): Observable<string|null> {
    return of(this.jwtSerivce.tokenUser)
  }

  private setToken(token: string): void {
    this.jwtSerivce.set(token)
  }

  public loginConf(user: User): void {
    this.userService.set(user)
    this.isGuest = false
    this.isLoginSystem.next(true)
  }

  public logoutConf(): void {
    this.isGuest = true
    this.userService.remove()
    this.jwtSerivce.remove()
    this.isLoginSystem.next(false)
  }




}
