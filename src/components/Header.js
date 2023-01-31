import logo from '../image/mesto_logo.svg';
import { Route, Link, Routes } from 'react-router-dom';

function Header({ logOut, headerEmail }) {
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
          path="/sign-in"
          element={
            <Link to={'/sign-up'} className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__container">
              <p className="header__email">{headerEmail}</p>
              <Link to={'/sign-in'} onClick={logOut} className="header__button">
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
