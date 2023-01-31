import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const [isValidInputName, setIsValidInputName] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [isValidInputLink, setIsInputLinkValid] = useState(true);
  const [linkErrorMessage, setLinkErrorMessage] = useState('');

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

  function handleLinkChange(e) {
    setLink(e.target.value);
    if (e.target.validity.valid) {
      setLinkErrorMessage('');
      setIsInputLinkValid(true);
    } else {
      setLinkErrorMessage(e.target.validationMessage);
      setIsInputLinkValid(false);
    }
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    props.onAddCard({
      name,
      link,
    });
  }

  useEffect(() => {
    setName('');
    setLink('');
    setNameErrorMessage('');
    setLinkErrorMessage('');
    setIsValidInputName(false);
    setIsInputLinkValid(false);
  }, [props.isOpen]);

  return (
    <PopupWithForm
      disabled={!isValidInputLink || !isValidInputName}
      name="card-add"
      title={'Новое место'}
      buttonText={props.isLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleFormSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        value={name}
        name="name"
        id="title-input"
        onChange={handleNameChange}
        className="form__input form__title"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
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
        value={link}
        name="link"
        onChange={handleLinkChange}
        id="link-inputCard"
        className="form__input form__link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <div className="form__error-conteiner">
        <span
          className={
            isValidInputName
              ? 'form-input-message-error'
              : 'form-input-message-error-active'
          }
        >
          {linkErrorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
