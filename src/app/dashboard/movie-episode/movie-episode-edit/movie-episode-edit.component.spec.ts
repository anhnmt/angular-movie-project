import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieEpisodeEditComponent } from './movie-episode-edit.component';

describe('MovieEpisodeEditComponent', () => {
  let component: MovieEpisodeEditComponent;
  let fixture: ComponentFixture<MovieEpisodeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieEpisodeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieEpisodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
