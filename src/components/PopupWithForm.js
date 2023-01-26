import React from 'react';

function PopupWithForm({
  disabled,
  name,
  isOpen,
  title,
  onClose,
  buttonText,
  onSubmit,
  children,
}) {
  return (
    <div
      onClick={onClose}
      className={`popup popup_${name} ${isOpen ? `popup_opened` : ''}`}
    >
      <form onSubmit={onSubmit} className="form" name={name} noValidate>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button
          disabled={disabled}
          className={
            disabled
              ? 'fpopup__button-submit popup__button_invalid'
              : 'popup__button-submit'
          }
          type="submit"
        >
          {buttonText}
        </button>
        <button
          className="popup__close popup__close_profile"
          type="button"
          onClick={onClose}
        ></button>
      </form>
    </div>
  );
}
export default PopupWithForm;
