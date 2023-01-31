import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image">
          <img
            src={currentUser.avatar}
            alt="Фото профиля"
            className="profile__avatar"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__text">{currentUser.about}</p>
          <button
            onClick={props.onEditProfile}
            className="button profile__edit-button"
            type="button"
          ></button>
        </div>
        <button
          onClick={props.onAddPlace}
          className="button profile__add-button"
          type="button"
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onClickCardDelete={props.onClickCardDelete}
            onConfirmClick={props.onConfirmClick}
            onCardLike={props.onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
