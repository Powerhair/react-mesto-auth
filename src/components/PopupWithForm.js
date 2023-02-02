import React from 'react';
import { useEffect } from 'react';

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
  function handleStop(e) {
    e.stopPropagation();
  }

  useEffect(() => {
    function handelEscape(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handelEscape);
    }

    return () => document.removeEventListener('keydown', handelEscape);
  }, [isOpen]);

  return (
    <div
      onClick={onClose}
      className={`popup popup_${name} ${isOpen ? `popup_opened` : ''}`}
    >
      <form
        onClick={handleStop}
        onSubmit={onSubmit}
        className="form"
        name={name}
        noValidate
      >
        <h3 className="popup__title">{title}</h3>
        {children}
        <button
          disabled={disabled}
          className={
            disabled
              ? 'popup__button-submit popup__button_invalid'
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
