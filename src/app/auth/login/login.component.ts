import { AuthService } from './../../data/services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pattern } from './../../data/public/Pattern';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, map, startWith, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router)
  private readonly snapshotQueryParams?:string = inject(ActivatedRoute).snapshot.queryParams['r'];
  private readonly matSnackBar = inject(MatSnackBar)
  ngOnInit(): void {}


  public loading = false;
  public hide = true

  public form = new FormGroup({
    email: new FormControl<string>('' , [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('' , [
      Validators.required,
      Validators.minLength(4),
    ])
  })


  submit(): void {
    if(this.form.invalid) return;
    this.loading = true;
    this.authService.login({
      username: this.form.value.email as string,
      password: this.form.value.password as string
    }).pipe(
      switchMap(_ => this.authService.attempt),
      finalize(() => this.loading = false)
    ).subscribe(_ => {
      this.matSnackBar.open('welcome ...')
      this.router.navigate(['/'])
    })
  }

  reset(): void {

  }

}
