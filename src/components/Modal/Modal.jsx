import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export function Modal({ onToggleModal, img }) {
  const onBackdropCloseModal = event => {
    if (event.target === event.currentTarget) {
      onToggleModal();
    }
  };

  useEffect(() => {
    const onCloseModal = event => {
      if (event.code === 'Escape') {
        onToggleModal();
      }
    };

    window.addEventListener('keydown', onCloseModal);

    return () => {
      window.removeEventListener('keydown', onCloseModal);
    };
  }, [onToggleModal]);

  return createPortal(
    <Overlay onClick={onBackdropCloseModal}>
      <ModalBox>
        <img src={img} alt="" />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};
