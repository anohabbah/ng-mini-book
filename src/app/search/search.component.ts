import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string | undefined;
  searchResults: any;

  constructor() { }

  ngOnInit(): void { }

  search(): void { }
}
