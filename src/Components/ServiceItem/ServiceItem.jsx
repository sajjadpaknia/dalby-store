import classes from "./ServiceItem.module.css";
export default function ServiceItem(props) {
  return (
    <div className={classes.container}>
      <figure className={classes.logo}>
        <img src={props.logo} alt={props.alt} />
      </figure>
      <div className={classes.info}>
        <h3 className={classes.title}>{props.title}</h3>
        <p className={classes.desc}>{props.desc}</p>
      </div>
    </div>
  );
}
