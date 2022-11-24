import classes from "./SMButton.module.css";

export default function SMButton({ children }) {
  return <button className={classes.button}>{children}</button>;
}
