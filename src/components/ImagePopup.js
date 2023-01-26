function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`popup popup_fullscreen popup_background-opacity ${
        isOpen ? `popup_opened` : ''
      }`}
    >
      <div className="popup__image-container">
        <img className="popup__image" src={card.link} alt="Фото места" />
        <button
          className="popup__close popup__close-button"
          type="button"
          name="image-popup-close-button"
        ></button>
        <h3 className="popup__image-title">{card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
