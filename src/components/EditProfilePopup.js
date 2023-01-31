import PopupWithForm from './PopupWithForm';
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const currentUser = useContext(CurrentUserContext);

  const [isValidInputName, setIsValidInputName] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [isValidInputDescription, setIsInputDescriptionValid] = useState(true);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameErrorMessage('');
      setIsValidInputName(true);
    } else {
      setNameErrorMessage(e.target.validationMessage);
      setIsValidInputName(false);
    }
  }

  function handleDescriptionChange(e) {
    setAbout(e.target.value);
    if (e.target.validity.valid) {
      setDescriptionErrorMessage('');
      setIsInputDescriptionValid(true);
    } else {
      setDescriptionErrorMessage(e.target.validationMessage);
      setIsInputDescriptionValid(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about,
    });
  }

  useEffect(() => {
    setNameErrorMessage('');
    setDescriptionErrorMessage('');
    setIsValidInputName(true);
    setIsInputDescriptionValid(true);
    if (props.isOpen) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      disabled={!(nameErrorMessage === '' && descriptionErrorMessage === '')}
      name="profile"
      title={'Редактировать профиль'}
      buttonText={props.isLoading ? `Сохранение...` : `Сохранить`}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    >
      <input
        value={name}
        name="name"
        onChange={handleNameChange}
        className="form__input form__name"
        type="text"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
      />
      <div className="form__error-conteiner">
        <span
          className={
            isValidInputName
              ? 'form-input-message-error'
              : 'form-input-message-error-active'
          }
        >
          {nameErrorMessage}
        </span>
      </div>
      <input
        name="about"
        value={about}
        onChange={handleDescriptionChange}
        className="form__input form__description"
        type="text"
        placeholder="Описание"
        required
        minLength="2"
        maxLength="200"
      />
      <div className="form__error-conteiner">
        <span
          className={
            isValidInputDescription
              ? 'form-input-message-error'
              : 'form-input-message-error-active'
          }
        >
          {descriptionErrorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
