import React, { ReactNode } from 'react';
import classes from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  addModalCloseHandler: () => void;
}

export function Modal({ children, addModalCloseHandler }: ModalProps) {
  return (
    <>
      <div className={classes.dim} onClick={addModalCloseHandler}></div>
      <dialog open className={classes.modal}>
        <button className={classes.closeBtn} onClick={addModalCloseHandler}>
          +
        </button>
        {children}
      </dialog>
    </>
  );
}
