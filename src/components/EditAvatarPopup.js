import PopupWithForm from './PopupWithForm';
import { useEffect, useRef, useState } from 'react';

function EditAvatarPopup(props) {
  const inputRef = useRef('');
  const [isValidInput, setIsValidInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleAvatarChange(e) {
    if (e.target.validity.valid) {
      setErrorMessage('');
      setIsValidInput(true);
    } else {
      setErrorMessage(e.target.validationMessage);
      setIsValidInput(false);
    }
  }

  useEffect(() => {
    setIsValidInput(false);
    setErrorMessage('');
    inputRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      disabled={!(errorMessage === '' && isValidInput)}
      buttonText={props.isLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      name="сhangeAvatar"
      title={'Обновить аватар'}
      onClose={props.onClose}
    >
      <input
        name="linkInput"
        ref={inputRef}
        id="link-input"
        className="form__input form__link"
        type="url"
        placeholder="Ссылка на картинку"
        onChange={handleAvatarChange}
        required
      />
      <div className="form__error-conteiner">
        <span
          className={
            isValidInput
              ? 'form-input-message-error'
              : 'form-input-message-error-active'
          }
        >
          {errorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
