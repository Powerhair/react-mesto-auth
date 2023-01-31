import { useState } from 'react';

function Login({ login }) {
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
    login(formValue.password, formValue.email);
    setFormValue(initalForm);
  }

  return (
    <form className="auth__form" onSubmit={handleSubmit} noValidate>
      <h2 className="auth__title">Вход</h2>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={formValue.email}
        onChange={handleChange}
        className="auth__input"
        autoComplete="off"
        required
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
        required
      />

      <button type="submit" className="auth__button">
        Войти
      </button>
    </form>
  );
}

export default Login;
