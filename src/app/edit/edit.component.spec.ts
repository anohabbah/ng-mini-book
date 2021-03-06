import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditComponent} from './edit.component';
import {Address, Person, SearchService} from "@app/shared";
import {ActivatedRoute, Router} from "@angular/router";
import {MockActivatedRoute, MockRouter} from "@app/shared/search/mocks/route";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  let mockSearchService: SearchService;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockActivatedRoute = new MockActivatedRoute({id: 1});
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter}
      ],
      imports: [FormsModule, HttpClientTestingModule],
    })
      .compileComponents();

    mockSearchService = TestBed.inject(SearchService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a single record', () => {
    const fixture = TestBed.createComponent(EditComponent);
    const person = new Person({id: 1, name: 'Michael Porter Jr.'});
    person.address = new Address({city: 'Denver'});
// mock response
    spyOn(mockSearchService, 'get').and.returnValue(of(person));
// initialize component
    fixture.detectChanges();
// verify service was called
    expect(mockSearchService.get).toHaveBeenCalledWith(1);
// verify data was set on component when initialized
    const editComponent = fixture.componentInstance;
    expect(editComponent.person.address.city).toBe('Denver');
// verify HTML renders as expected
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').innerHTML).toBe('Michael Porter Jr.');
  });
});
