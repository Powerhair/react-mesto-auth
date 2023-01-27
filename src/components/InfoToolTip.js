import success from '../image/success.svg';
import fail from '../image/fail.svg';

function InfoTooltip({ onClose, isOpen, registerResponse }) {
  return (
    <section className={`popup ${isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <img
          src={registerResponse.status ? success : fail}
          className="popup__image"
          alt="Вы успешно зарегистрировались!"
        ></img>
        <h2 className="popup__title">{registerResponse.text}</h2>
      </div>
    </section>
  );
}
export default InfoTooltip;
