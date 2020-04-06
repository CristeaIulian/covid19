import { Component } from '@angular/core';

import generalInfo from '../../mocks/general-info.json';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent {
  data = generalInfo;
}
