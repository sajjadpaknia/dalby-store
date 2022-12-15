import { Link } from "react-router-dom";
import data from "./Data";
import classes from "./UserDropdown.module.css";
export default function UserDropdown({ dropdownRef, state }) {
  const user = JSON.parse(localStorage.getItem("auth-user"));
  const items = data.map((item) => {
    return (
      <li className={classes.userDropdown__item} key={item.id}>
        <Link to={item.to}>
          <i className={item.icon}></i>
          <span>{item.title}</span>
        </Link>
      </li>
    );
  });
  return (
    <div
      style={{ width: `${user ? "250px" : "200px"}` }}
      className={`${classes.userDropdown} ${state ? classes.show : null}`}
      ref={dropdownRef}
    >
      {user && (
        <div className={classes.user}>
          <Link to={"#"}>
            <div className={classes.userIcon}>
              <i className="fa-regular fa-user"></i>
            </div>
            <div className={classes.userInfo}>
              <h1>{user.name}</h1>
              <i className="fa-regular fa-chevron-right"></i>
            </div>
          </Link>
        </div>
      )}
      <ul className={classes.userDropdown__list}>
        {user ? (
          <>
            {items}
            <li
              className={classes.userDropdown__item}
              onClick={() => localStorage.removeItem("auth-user")}
            >
              <a>
                <i className={"fa-regular fa-arrow-right-from-bracket"}></i>
                <span>Logout</span>
              </a>
            </li>
          </>
        ) : (
          <li className={classes.userDropdown__item}>
            <Link to={"/signup"}>
              <i className={"fa-regular fa-arrow-right-to-bracket"}></i>
              <span>Sign Up</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
