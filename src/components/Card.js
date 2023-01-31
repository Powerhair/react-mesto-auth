import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card({ card, onCardClick, onClickCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onClickCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButton = `element__like ${isLiked && 'element__like-active'}`;

  return (
    <div className="element">
      {isOwn && (
        <button
          className="element__trash"
          onClick={handleDeleteClick}
          type="button"
        />
      )}
      <img
        alt={card.name}
        src={card.link}
        onClick={handleCardClick}
        className="element__image"
      />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-section">
          <button
            className={cardLikeButton}
            onClick={handleLikeClick}
            type="button"
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
