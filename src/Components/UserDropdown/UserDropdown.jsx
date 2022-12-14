import { Link } from "react-router-dom";
import data from "./Data";
import classes from "./UserDropdown.module.css";
export default function UserDropdown({ dropdownRef, state }) {
  return (
    <div
      className={`${classes.userDropdown} ${state ? classes.show : null}`}
      ref={dropdownRef}
    >
      <ul className={classes.userDropdown__list}>
        {data.map((item) => {
          return (
            <li className={classes.userDropdown__item} key={item.id}>
              <Link to={item.to}>
                <i className={item.icon}></i>
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
