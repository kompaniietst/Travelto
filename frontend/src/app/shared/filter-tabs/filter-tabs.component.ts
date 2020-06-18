import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterTabsService } from 'src/app/core/services/filter-tabs.service';

@Component({
  selector: 'app-filter-tabs',
  templateUrl: './filter-tabs.component.html',
  styleUrls: ['./filter-tabs.component.scss']
})
export class FilterTabsComponent implements OnInit {

  filterTabs: Observable<any>;


  constructor(private filterTabsService: FilterTabsService) { }

  ngOnInit(): void {
    this.filterTabs = this.filterTabsService.get()
  }

  removeTab(_id: string) {
    this.filterTabsService.remove(_id);
  }

  trackById(index, item) {
    return item.id;
  }
}
