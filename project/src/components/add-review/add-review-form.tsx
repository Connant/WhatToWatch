import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendReview } from '../../store/actions-api';
import { getCurrentFilm } from '../../store/selectors';
import Stars from './stars';

const DEFAULT_RATING = 0;
const MIN_POST_LENGTH = 50;
const MAX_POST_LENGTH = 400;

export type ReviewPost = {
  id: number,
  user: {
    id: number,
    name: string,
  },
  date: string,
  rating: number,
  comment: string,
}

export type ReviewRC = {
  rating: number,
  comment: string,
}

export default function AddReviewForm(): JSX.Element {
  const [userInput, setUserInput] = useState('');
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [isFormSending, setIsFormSending] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const currentFilm = useSelector(getCurrentFilm);
  const dispatch = useDispatch();

  const sendComment = (id: number, data: ReviewRC) => dispatch(sendReview(id, data));

  useEffect(() => {
    const isRatingValid = rating > DEFAULT_RATING;
    const isTextAreaValid = userInput.length >= MIN_POST_LENGTH && userInput.length <= MAX_POST_LENGTH;

    setIsFormValid(isRatingValid && isTextAreaValid);

    return function cleanup() {
      setIsFormSending(false);
    };
  }, [rating, userInput]);

  const handleRatingChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => setRating(+evt.currentTarget.value),
    [],
  );

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const postData = {
      rating: rating,
      comment: userInput,
    };

    setIsFormSending(true);
    sendComment(currentFilm.id, postData);
  };


  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <div className="rating">
          <div className="rating__stars">
            <Stars onChange={handleRatingChange} isDisabled={isFormSending} />
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            value={userInput}
            disabled={isFormSending}
            onChange={(evt) => setUserInput(evt.currentTarget.value)}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={isFormSending || !isFormValid}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

