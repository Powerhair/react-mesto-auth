import PopupWithForm from './PopupWithForm';

function DeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onConfirmDeleteClick(props.card);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      buttonValid={true}
      title={'Вы уверенны?'}
      buttonText={props.isLoading ? `Удаление...` : `Да`}
      name="delete"
      onClose={props.onClose}
    />
  );
}

export default DeletePopup;
