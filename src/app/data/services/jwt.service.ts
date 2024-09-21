import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  private authKay: string|null = null;
  private readonly TOKEN = 'yadava_token';

  public set(token: string): void {
    window.localStorage.setItem(this.TOKEN , token)
  }

  public remove(): void {
    window.localStorage.removeItem(this.TOKEN)
    this.authKay = null;
  }

  public get tokenUser(): string|null {
    if(!this.authKay) {
      this.authKay = window.localStorage.getItem(this.TOKEN)
    }
    return this.authKay;
  }

}
