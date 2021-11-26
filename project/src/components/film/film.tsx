import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { Film } from '../film-card/film-card';
import { fetchFilmsAction } from '../../store/actions-api';
import { getAuthorizationStatus, getCurrentFilm } from '../../store/selectors';

import SimilarFilms from './similar-films';
import Loading from '../loading/loading';
import Error from '../error/error';
import UserBlock from '../user-block/ user-block';
import MyListButton from '../my-list/my-list-button';
import FilmTabs from '../tabs/film-tabs/film-tabs';


export default function FilmPage(): JSX.Element {
  const currentFilms = useSelector(getCurrentFilm);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const getFilm = (currentFilmId: number) => {
    dispatch(fetchFilmsAction());
  };

  const { id }: {id: string} = useParams();
  const filmId = Number(id);

  useEffect(() => {
    if (currentFilms.id !== filmId) {
      getFilm(filmId);
    }
  });

  const history = useHistory();

  // const [activeTab, setActiveTab] = useState('Overview');

  if (currentFilms.id !== filmId) {
    return (
      <Loading />
    );
  }

  if (!currentFilms) {
    return <Error />;
  }

  const {
    name,
    backgroundImage,
    genre,
    released,
    posterImage,
  } = currentFilms as Film;

  return (
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={AppRoute.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => history.push(AppRoute.Player.replace(':id', `${filmId}`))}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>

                <MyListButton film={currentFilms} />

                {authorizationStatus !== AuthorizationStatus.NoAuth &&
                  <Link className="btn film-card__button" to={AppRoute.AddReview.replace(':id', `${filmId}`)}>
                    Add review
                  </Link>}
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>
            <FilmTabs id={filmId} film={currentFilms}/>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <SimilarFilms />

        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>

      </div>
    </React.Fragment>
  );
}


