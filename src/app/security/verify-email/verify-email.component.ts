import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  code: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.code =String(this.route.snapshot.paramMap.get('code'));

    this.authService.verifyUser(this.code);
    console.log(this.code);
  }

}
