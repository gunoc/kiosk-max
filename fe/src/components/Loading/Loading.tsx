import classes from './Loading.module.css';

export function Loading() {
  return (
    <div className={classes.loading}>
      <div className={classes.wrapper}>
        <img className={classes.logo} src="/assets/logo.png" alt="logo" />
        <p className={classes.text}>결제 진행중...</p>
      </div>
    </div>
  );
}
