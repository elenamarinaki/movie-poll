import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { RecordsService } from '../records.service';
import { Record } from '../record';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css'],
})
export class QuestionnaireComponent implements OnInit {
  movieForm: FormGroup;
  genres: string[] = [
    'Please select',
    'action',
    'comedy',
    'drama',
    'horror',
    'romance',
    'sci-fi',
    'animation'
  ];
  seasons: string[] = ['Please select', 'spring', 'summer', 'fall', 'winter'];
  places: string[] = ['Cinema', 'Home'];
  frequency: string[] = ['Please select', 'weekly', 'monthly', 'yearly'];
  allRecords: Record[] = [];

  constructor(
    private fb: FormBuilder,
    private recordsService: RecordsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      genre: [this.genres[0], [Validators.required]],
      season: [this.seasons[0], [Validators.required]],
      place: [this.places[0], [Validators.required]],
      frequency: [this.frequency[0], [Validators.required]],
      favouriteMovie: ['', [Validators.required]],
    });

    this.movieForm.valueChanges.subscribe((value) =>
      console.log('value -- ', value)
    );
  }

  getRecords(): void {
    this.recordsService
      .getRecords()
      .subscribe((data) => {
        console.log('Records are: ', data)
        this.allRecords = data;
      });
  }

  postRecord(): void {
    if (this.movieForm.valid) {
      const record = { ...this.movieForm.value };

      let dateTime = new Date();
      record.createdAt = dateTime.toLocaleString();

      record.recordId = uuidv4();

      this.recordsService.postRecord(record).subscribe((data) => {
        console.log('Record posted! ', data);
        this.onSubmitComplete();
      });
    } else {
      console.log('Error - todo!');
    }
  }

  onSubmitComplete(): void {
    this.movieForm.reset();
    this.router.navigate(['/records']);
  }

  showRecords(): void {
    this.router.navigate(['/records']).then(data => console.log('navigation promise --- ', data));
  }
}
