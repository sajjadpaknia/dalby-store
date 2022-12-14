import classes from "./Button.module.css";

export default function Button({ children }) {
  return <div className={classes.btnGroup}>{children}</div>;
}
