import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
})
export class RadioComponent {
  @Input() options: string[];
  @Input() labelText: string;
  @Input() id: string;
  @Input() group: FormGroup;
}
