import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private subjectUser = new ReplaySubject<User|null>(1)
  public user$ = this.subjectUser.asObservable()

  private identities!: User|null;

  public set(user: User) {
    this.subjectUser.next(user)
    this.identities = user;
  }

  public remove() {
    this.subjectUser.next(null)
    this.identities = null;
  }

  public get user() {
    return this.identities;
  }
}
