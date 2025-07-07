import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSynopsisDialog } from './movie-synopsis-dialog.component';

describe('MovieSynopsisDialog', () => {
  let component: MovieSynopsisDialog;
  let fixture: ComponentFixture<MovieSynopsisDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSynopsisDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSynopsisDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
