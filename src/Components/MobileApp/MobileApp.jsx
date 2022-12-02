import { Link } from "react-router-dom";
import classes from "./MobileApp.module.css";
export default function MobileApp() {
  return (
    <div className={classes.container}>
      <figure className={classes.figure}>
        <img src="./assets/images/shop.png" alt="" />
      </figure>
      <div className={classes.group}>
        <figure className={classes.apps}>
          <Link to={"#"}>
            <img src="./assets/svg/google-play.svg" alt="" />
          </Link>
        </figure>
        <figure className={classes.apps}>
          <Link to={"#"}>
            <img src="./assets/svg/app-store.svg" alt="" />
          </Link>
        </figure>
      </div>
    </div>
  );
}
