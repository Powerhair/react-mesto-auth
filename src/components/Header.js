import logo from '../image/mesto_logo.svg';
import { Route, Link, Routes } from 'react-router-dom';

function Header({ escape, headerEmail }) {
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to={'/sign-in'} className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to={'/sign-in'} className="header__link">
              Регистрация
            </Link>
          }
        />
      </Routes>
      <div className="header__userElements_active">
        <p className="header__userElements-email">{headerEmail}</p>
        <button onClick={escape} className="links header__userElements-logout">
          Выйти
        </button>
      </div>
    </header>
  );
}

export default Header;
