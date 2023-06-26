import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
}

export function Modal({ children }: ModalProps) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  function openHandler() {
    if (isOpen) {
      return;
    }

    setIsOpen(true);
  }

  function closeHandler() {
    navigate('..');
  }

  return (
    <>
      <div className={classes.dim} onClick={closeHandler}></div>
      <dialog open className={classes.modal}>
        <button className={classes.closeBtn} onClick={closeHandler}>
          +
        </button>
        {children}
      </dialog>
    </>
  );
}
