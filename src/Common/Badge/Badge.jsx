import classes from "./Badge.module.css";
export default function Badge({ title, bkColor }) {
  return (
    <div className={classes.badge} style={{ background: bkColor }}>
      <i className="fa-solid fa-circle-small"></i>
      {title}
    </div>
  );
}
