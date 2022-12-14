import { Link } from "react-router-dom";
import classes from "./RegisterCard.module.css";

export default function RegisterCard({ children, spinner, backToHome }) {
  return (
    <>
      {backToHome && (
        <div className={classes.backToHome}>
          <Link to={"/"}>
            <i className="fa-regular fa-chevron-left"></i>
            <p>Back to Home</p>
          </Link>
        </div>
      )}
      <div className={classes.container}>
        <div className={`${classes.card} ${spinner ? classes.disabled : ""}`}>
          {children}
        </div>
      </div>
    </>
  );
}
