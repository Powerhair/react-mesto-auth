import success from '../image/success.svg';
import fail from '../image/fail.svg';

function InfoTooltip({ onClose, isOpen, registerMessage }) {
  return (
    <section className={`popup ${isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <img
          src={registerMessage.status ? success : fail}
          className="popup__image popup__image-auth"
          alt="Вы успешно зарегистрировались!"
        ></img>
        <h2 className="popup__title popup__auth-title">
          {registerMessage.text}
        </h2>
      </div>
    </section>
  );
}
export default InfoTooltip;
