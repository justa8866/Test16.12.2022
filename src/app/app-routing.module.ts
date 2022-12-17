import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobComponent } from './components/job/job.component';
import { JobComponentModule } from './components/job/job.component-module';
import { JobPostServiceModule } from './services/job-post.service-module';
import { JobTagServiceModule } from './services/job-tag.service-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: '', component: JobComponent }]), JobComponentModule, JobPostServiceModule, JobTagServiceModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
