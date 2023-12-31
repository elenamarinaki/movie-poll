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
    'animation',
    'mystery',
    'crime',
    'thriller'
  ];
  seasons: string[] = ['', 'spring', 'summer', 'fall', 'winter'];
  places: string[] = ['Cinema', 'Home'];
  frequency: string[] = ['', 'weekly', 'monthly', 'yearly'];
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
  }

  getRecords(): void {
    this.recordsService
      .getRecords()
      .subscribe((data) => {
        this.allRecords = data;
      });
  }

  postRecord(): void {
    if (this.isFormValid()) {
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

  isFormValid(): boolean {
    let isFormValid = true;
    Object.entries(this.movieForm.controls).forEach(item => {
      if (item[0] !== 'place' && !item[1].touched) {
        isFormValid = false;
      }
    })
    return isFormValid;
  }
}
