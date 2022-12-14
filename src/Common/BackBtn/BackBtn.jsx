import classes from "./BackBtn.module.css";

export default function BackBtn({ children }) {
  return <div className={classes.container}>{children}</div>;
}
