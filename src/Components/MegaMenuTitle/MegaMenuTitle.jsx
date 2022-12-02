import classes from "./MegaMenuTitle.module.css";
export default function MegaMenuTitle({ title }) {
  return (
    <div className={classes.container}>
      <h3 className={classes.title}>{title}</h3>
    </div>
  );
}
