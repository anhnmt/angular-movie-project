import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forkJoin, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {MovieService} from '../../../shared/services/movie.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {MovieTypeService} from '../../../shared/services/movie-type.service';
import {MovieType} from '../../../shared/interfaces/movie-type';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {HelperUtils} from '../../../shared/utils/helperUtils';
import {GenreService} from '../../../shared/services/genre.service';
import {CountryService} from '../../../shared/services/country.service';
import {Country} from '../../../shared/interfaces/country';
import {Genre} from '../../../shared/interfaces/genre';
import {NzUploadFile} from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  visible = false;
  status = GlobalUtils.getDefaultStatus();
  fileList: NzUploadFile[] = [];
  movieTypes: MovieType[] = [];
  countries: Country[] = [];
  genres: Genre[] = [];
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
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
      origin_name: [null],
      name: [null, [Validators.required]],
      slug: [null, [Validators.required]],
      release_date: [null, [Validators.required]],
      movie_type_id: [null, [Validators.required]],
      poster: [null],
      country_ids: [null],
      genre_ids: [null],
      status: [selectedStatus, [Validators.required]],
    });

    forkJoin([
      this.movieTypeService.getAllMovieTypes(),
      this.countryService.getAllCountries(),
      this.genreService.getAllGenres()
    ])
      .subscribe(([movieTypes, countries, genres]) => {
        this.movieTypes = movieTypes.data;
        this.countries = countries.data;
        this.genres = genres.data;

        const defaultMovieType = this.movieTypes[0]?.movie_type_id || null;
        this.validateForm.patchValue({
          movie_type_id: defaultMovieType
        });
      });
  }

  handlePreview = async (file: NzUploadFile) => {
    const {originFileObj, url, preview} = file;

    if (!url && !preview && originFileObj !== undefined) {
      file.preview = await HelperUtils.getBase64(originFileObj);
      file.status = 'done';
    }
  };

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

    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      const {originFileObj, url, preview} = file;

      if (!url && !preview && originFileObj !== undefined) {
        formData.append('poster', originFileObj);
      }
    });

    // console.log(this.validateForm.value);
    formData.append('movie', JSON.stringify(this.validateForm.value));

    this.movieService.createMovie(formData).subscribe(() => {
      this.sharedService.emitChange();
      this.close();
      this.nzMessageService.success('Thêm Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.error?.message);
      this.isLoading = false;
    });
  }
}
