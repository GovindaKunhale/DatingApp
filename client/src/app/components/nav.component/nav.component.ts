import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class Nav {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService)
  model: any ={};

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
      },
      error: error => {
        this.toastr.error(error.error)
      }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/home');
  }
}
