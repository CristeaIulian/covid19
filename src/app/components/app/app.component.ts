import { Component, OnInit } from '@angular/core';

import { ThemingService } from '@memobit/angular/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _themeService: ThemingService) {}

  public ngOnInit(): void {
    this._themeService.setTheme('assets');
  }
}
