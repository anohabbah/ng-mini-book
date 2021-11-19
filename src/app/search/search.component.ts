import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person, SearchService } from "@app/shared";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  query!: string;
  searchResults: Person[] = [];
  private sub!: Subscription;

  constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (params.term) {
        this.query = decodeURIComponent(params.term);
        this.search();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  search(): void {
    this.searchService.search(this.query).subscribe(
      (data: Person[]) => { this.searchResults = data; },
        error => console.log(error)
    );
  }
}
