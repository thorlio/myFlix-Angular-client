import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreDialog } from './genre-dialog.component';

describe('GenreDialog', () => {
  let component: GenreDialog;
  let fixture: ComponentFixture<GenreDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
