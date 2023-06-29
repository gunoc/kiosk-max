import React, { ReactNode } from 'react';
import classes from './Modal.module.css';

interface ModalProps {
  children: any;
  modalCloseHandler: () => void;
}

export function Modal({ children, modalCloseHandler }: ModalProps) {
  return (
    <>
      <div className={classes.dim} onClick={modalCloseHandler}></div>
      <div className={classes.modalWrapper}>
        <dialog open className={classes.modal}>
          <button className={classes.closeBtn} onClick={modalCloseHandler}>
            +
          </button>
          {children}
        </dialog>
      </div>
    </>
  );
}
