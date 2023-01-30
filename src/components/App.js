import { useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../index.css';
import { api } from '../utils/Api';
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import DeletePopup from './DeletePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import * as auth from '../auth';
import { register, login } from '../auth';
import ProtectedRouteElement from './ProtectedRoute.js';
import InfoTooltip from './InfoToolTip.js';

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setloggedIn] = useState(true);
  const [registerMessage, setRegisterMessage] = useState({
    status: false,
    text: '',
  });
  const [headerEmail, setHeaderEmail] = useState('');

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isOpenConfimPopup, setIsAddConfimPopup] = useState(false);
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const navigate = useNavigate();

  function handelRegisterClick(password, email) {
    register(password, email)
      .then((res) => {
        if (res) {
          setRegisterMessage({
            status: true,
            text: 'Вы успешно зарегистрировались!',
          });
          navigate('/sign-in', { replace: true });
        }
      })
      .catch((err) => {
        setOpenInfoTooltip(true);
        setRegisterMessage({
          status: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        console.log(err);
      })
      .finally(() => setOpenInfoTooltip(true));
  }

  function handelLoginClick(password, email) {
    login(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setloggedIn(true);
        setHeaderEmail(email);
        navigate('/react-mesto-auth', { replace: true });
      })
      .catch((err) => {
        setOpenInfoTooltip(true);
        setRegisterMessage({
          status: false,
          text: 'Вы не зарегестрированны',
        });
        console.log(err);
      });
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setloggedIn(true);
          setHeaderEmail(res.data.email);
          navigate('/react-mesto-auth', { replace: true });
        }
      });
    }
  }, []);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([currentUser, cards]) => {
        setCurrentUser(currentUser);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick(card) {
    setIsAddCardPopupOpen(true);
    setSelectedCard(card);
  }

  function handleConfimCardDelete(card) {
    setIsAddConfimPopup(true);
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
        console.log(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .getUserAvatar(avatar)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddCard(data) {
    setIsLoading(true);
    api
      .postUserCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .removeLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    function handelEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    function handleClosePopups(evt) {
      if (
        evt.target.classList.contains('popup_opened') ||
        evt.target.classList.contains('popup__close')
      ) {
        closeAllPopups();
      }
    }

    document.addEventListener('mousedown', handleClosePopups);
    document.addEventListener('keydown', handelEscape);

    return () => {
      document.removeEventListener('keydown', handelEscape);
      document.removeEventListener('mousedown', handleClosePopups);
    };
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsAddConfimPopup(false);
    setOpenInfoTooltip(false);
  }

  function escape() {
    localStorage.removeItem('jwt');
    setHeaderEmail('');
    setloggedIn(false);
    navigate('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header escape={escape} headerEmail={headerEmail} />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register register={handelRegisterClick} />}
          ></Route>
          <Route
            path="/sign-in"
            element={<Login login={handelLoginClick} />}
          ></Route>
          <Route
            path="/react-mesto-auth"
            element={
              <ProtectedRouteElement
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onClickCardDelete={handleConfimCardDelete}
                onCardLike={handleCardLike}
                loggedIn={loggedIn}
              />
            }
          ></Route>
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onAddCard={handleAddCard}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          isOpen={isAddCardPopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        ></ImagePopup>
        <DeletePopup
          isOpen={isOpenConfimPopup}
          onClose={closeAllPopups}
          onConfirmDeleteClick={handleCardDelete}
          card={selectedCard}
        />
        <InfoTooltip
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          registerMessage={registerMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
