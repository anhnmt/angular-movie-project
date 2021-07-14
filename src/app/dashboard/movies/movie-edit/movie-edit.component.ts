import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from '../../../shared/interfaces/movie';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forkJoin, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../../../shared/services/movie.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {takeUntil} from 'rxjs/operators';
import {MovieType} from '../../../shared/interfaces/movie-type';
import {MovieTypeService} from '../../../shared/services/movie-type.service';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {HelperUtils} from '../../../shared/utils/helperUtils';
import {Country} from '../../../shared/interfaces/country';
import {Genre} from '../../../shared/interfaces/genre';
import {CountryService} from '../../../shared/services/country.service';
import {GenreService} from '../../../shared/services/genre.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  visible = false;
  status = GlobalUtils.getDefaultStatus();
  movie: Movie;
  movieTypes: MovieType[] = [];
  countries: Country[] = [];
  genres: Genre[] = [];
  selectedCountries: Country[] = [];
  selectedGenres: Genre[] = [];
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService,
    private sharedService: SharedService,
    private movieTypeService: MovieTypeService,
    private countryService: CountryService,
    private genreService: GenreService,
  ) {
    const selectedStatus = this.status[0]?.value || null;

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      slug: [null, [Validators.required]],
      movie_type_id: [null, [Validators.required]],
      country_ids: [null],
      genre_ids: [null],
      status: [selectedStatus, [Validators.required]],
    });

    this.route.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params: any) => {
        const {movieId} = params;

        forkJoin([
          this.movieTypeService.getAllMovieTypes(),
          this.countryService.getAllCountries(),
          this.genreService.getAllGenres(),
          this.movieService.getMovieByMovieId(movieId),
          this.movieService.getAllCountriesByMovieId(movieId),
          this.movieService.getAllGenresByMovieId(movieId),
        ])
          .subscribe(([movieTypes, countries, genres, movie, selectedCountries, selectedGenres]) => {
            this.movieTypes = movieTypes.data;
            this.countries = countries.data;
            this.genres = genres.data;
            this.movie = movie.data;
            this.selectedCountries = selectedCountries.data.map((item: any) => item.country_id);
            this.selectedGenres = selectedGenres.data.map((item: any) => item.genre_id);

            const defaultMovieType = this.movieTypes[0]?.movie_type_id || null;
            const selectedMovieType = GlobalUtils.mapMovieType(this.movieTypes, this.movie.movie_type_id)?.movie_type_id;

            this.validateForm.patchValue({
              name: this.movie.name,
              slug: this.movie.slug,
              movie_type_id: selectedMovieType || defaultMovieType,
              country_ids: this.selectedCountries,
              genre_ids: this.selectedGenres,
              status: this.movie.status
            });
          }, (error) => {
            this.close();
            this.nzMessageService.error(error.error.message);
          });
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;

      HelperUtils.formChangedTitleToSlug(this.validateForm);
    }, 1);
  }

  close(): void {
    this.visible = false;

    setTimeout(
      () => this.router.navigate(['/dashboard', 'movies']),
      100
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  submitForm(): void {
    this.isLoading = true;

    HelperUtils.formValidator(this.validateForm);

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      this.isLoading = false;
      return;
    }

    // console.log(this.validateForm.value);

    this.movieService.updateMovieByMovieId(this.movie.movie_id, this.validateForm.value)
      .subscribe(() => {
        this.sharedService.emitChange();
        this.close();
        this.nzMessageService.success('Cập nhật Thành Công');
      }, (error) => {
        this.nzMessageService.error(error.message);
        this.isLoading = false;
      });
  }
}
