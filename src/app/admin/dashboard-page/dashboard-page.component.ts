import {Component, OnDestroy, OnInit} from '@angular/core';

import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub!: Subscription
  dSub!: Subscription
  searchStr = ''

  constructor(private postsService: PostService, private alerService: AlertService) {
  }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {// |
      this.posts = posts
    })
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(()=>{
        this.posts.filter(post=>post.id!==id)
        this.alerService.warning('Пост был удалён')
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
