import { Link } from "react-router-dom";
import Profile from "../../Common/Profile/Profile";
import classes from "./MegaMenuMsg.module.css";

export default function MegaMenuMsg() {
  return (
    <div className={classes.notification}>
      <Profile
        size={"45px"}
        imageAddress={"./assets/images/profile/Woman.jpeg"}
        alt={"the woman is laughing"}
      />
      <p className={classes.msg}>
        Enter your email address to be reminded of discounts and special offers.
        <span>
          <Link>Let's go.</Link>
        </span>
      </p>
    </div>
  );
}
