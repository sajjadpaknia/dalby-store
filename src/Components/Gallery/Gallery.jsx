import Badge from "../../Common/Badge/Badge";
import classes from "./Gallery.module.css";
export default function Gallery(props) {
  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <Badge title={props.badgeTitle} bkColor={props.badgeBKColor} />
        <p className={classes.description}>{props.description}</p>
      </div>
      <figure className={classes.background}>
        <img src={props.background} alt={props.alt} />
      </figure>
    </div>
  );
}
