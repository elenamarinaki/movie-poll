import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { RecordsComponent } from './records/records.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionnaireComponent,
  },
  {
    path: 'records',
    component: RecordsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
