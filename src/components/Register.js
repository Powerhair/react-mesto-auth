import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register({ register }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const initalForm = { email: '', password: '' };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    register(formValue.password, formValue.email);

    setFormValue(initalForm);
  }

  return (
    <form className="auth__form" onSubmit={handleSubmit} noValidate>
      <h2 className="auth__title">Регистрация</h2>

      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={formValue.email}
        onChange={handleChange}
        className="auth__input"
        autoComplete="off"
      />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        value={formValue.password}
        onChange={handleChange}
        className="auth__input"
        autoComplete="off"
      />

      <button type="submit" className="auth__button">
        Зарегистрироваться
      </button>

      <Link to="/sign-in" className="auth__link">
        Уже зарегистрировались? Войти
      </Link>
    </form>
  );
}

export default Register;
