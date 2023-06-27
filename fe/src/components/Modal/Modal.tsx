import React, { ReactNode } from 'react';
import classes from './Modal.module.css';

interface ModalProps {
  children: any;
  addModalCloseHandler: () => void;
}

export function Modal({ children, addModalCloseHandler }: ModalProps) {
  return (
    <>
      <div className={classes.dim} onClick={addModalCloseHandler}></div>
      <div className={classes.modalWrapper}>
        <dialog open className={classes.modal}>
          <button className={classes.closeBtn} onClick={addModalCloseHandler}>
            +
          </button>
          {children}
        </dialog>
      </div>
    </>
  );
}
