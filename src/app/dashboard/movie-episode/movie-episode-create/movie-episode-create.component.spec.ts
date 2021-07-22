import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieEpisodeCreateComponent } from './movie-episode-create.component';

describe('MovieEpisodeCreateComponent', () => {
  let component: MovieEpisodeCreateComponent;
  let fixture: ComponentFixture<MovieEpisodeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieEpisodeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieEpisodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
