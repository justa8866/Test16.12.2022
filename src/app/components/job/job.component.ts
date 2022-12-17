import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, of, switchMap} from 'rxjs';
import { JobPostModel } from '../../models/job-post.model';
import { JobTagModel } from '../../models/job-tag.model';
import { JobPostService } from '../../services/job-post.service';
import { JobTagService } from '../../services/job-tag.service';
import {MatListOption, MatSelectionListChange} from "@angular/material/list";

@Component({
  selector: 'app-job',
  styleUrls: ['./job.component.scss'],
  templateUrl: './job.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobComponent {
  readonly jobPost$: Observable<JobPostModel[]> = this._jobPostService.getAll();
  readonly jobTag$: Observable<JobTagModel[]> = this._jobTagService.getAll();

  constructor(private _jobPostService: JobPostService, private _jobTagService: JobTagService) {
  }
  private _orderSubject: BehaviorSubject<string> = new BehaviorSubject<string>('asc');

  public order$: Observable<string> = this._orderSubject.asObservable();

  jobPosts$: Observable<JobPostModel[]> = combineLatest([this._jobPostService.getAll(),
    this.order$
  ]).pipe(
    map(([products, order]: [JobPostModel[], string]) => {
        return products.filter(item => this.jobTagsSelected.length ? item.jobTagIds.some(tagId => this.jobTagsSelected.indexOf(tagId) >= 0) : item).sort((a,b) => {
          if(a.title > b.title) return order === 'asc' ? 1 : -1;
          if(a.title < b.title) return order === 'asc' ? -1 : 1;
          return 0;
        })
      }
    ))

  private _refreshSubject: BehaviorSubject<void> = new BehaviorSubject<void>(
    void 0
  );
  public refresh$: Observable<void> = this._refreshSubject.asObservable();
  readonly refreshedList$: Observable<JobPostModel[]> = this.refresh$.pipe(
    switchMap((data) => this._jobPostService.getAll())
  );

  public orders: Observable<string[]> = of(['asc', 'desc'])
  jobTagsSelected: string[] = [];

  sort(order: string): void {
    this._orderSubject.next(order);
  }

  delete(id: string): void {
    this._jobPostService.delete(id).subscribe();
  }

  onSelection($event: MatSelectionListChange, selected: MatListOption[]) {
    const jobTagsId: string[] = [];

    console.log(selected);

    selected.map(select => jobTagsId.push(select.value.id));

    this.jobTagsSelected = jobTagsId;
  }
}
