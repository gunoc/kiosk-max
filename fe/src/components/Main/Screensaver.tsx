import classes from './Screensaver.module.css';

export function Screensaver() {
  function navigateToMain() {
    window.history.pushState({}, '', '/home');
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  }

  return (
    <>
      <div className={classes.layout} onClick={navigateToMain}>
        <img className={classes.img} src="/assets/logo.png" alt="logo" />
        <button className={classes.btn}>주문하기</button>
      </div>
    </>
  );
}
