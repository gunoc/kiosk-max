import classes from './Modal.module.css';

interface ModalProps {
  children: any;
  closeHandler: () => void;
}

export function Modal({ children, closeHandler }: ModalProps) {
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
