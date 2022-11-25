import { Link } from "react-router-dom";
import Search from "../Search/Search";
import SMButton from "../SMButton/SMButton";
import classes from "./Header.module.css";
export default function Header() {
  return (
    <header className={classes.header}>
      <figure className={classes.logo}>
        <Link to={"/"}>
          <img src="./assets/svg/light-logo.svg" alt="logo" />
        </Link>
      </figure>
      <div className={classes.search}>
        <Search />
      </div>
      <div className={classes.buttonGroup}>
        <SMButton>
          <i class="fa-regular fa-grid-2"></i>
        </SMButton>
        <SMButton>
          <Link>
            <i class="fa-regular fa-cart-shopping"></i>
          </Link>
        </SMButton>
        <SMButton>
          <i class="fa-regular fa-user"></i>
        </SMButton>
      </div>
    </header>
  );
}
