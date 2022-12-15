import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import SMButton from "../SMButton/SMButton";
import UserDropdown from "../UserDropdown/UserDropdown";
import classes from "./Header.module.css";
import MegaMenu from "../MegaMenu/MegaMenu";
import axios from "axios";
export default function Header() {
  // The number of products in the shopping cart
  const [count, setCount] = useState(2);
  // If "megaMenuState" is "true", "Mega menu" will be displayed.
  const [megaMenuState, setMegaMenuState] = useState(false);
  // If "userDropdown" is "true", "User dropdown" will be displayed.
  const [userDropdown, setUserDropdown] = useState(true);
  const dropdownRef = useRef();
  const userBtnRef = useRef();
  // When "Mega menu" is displayed, the "Scrolls of Body" must be disabled for "Mega menu" to be displayed correctly.
  useEffect(() => {
    if (megaMenuState) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      return;
    }
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  }, [megaMenuState]);
  // Closing the "User dropdown" when the user clicks outside of it
  window.addEventListener("click", (e) => {
    if (e.target !== dropdownRef.current && e.target !== userBtnRef.current) {
      setUserDropdown(false);
    }
  });

  // Codes
  return (
    <>
      <header className={classes.header}>
        <div className={classes.header__container}>
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
              <div
                className={classes.absoluteBtn}
                onClick={() => {
                  setMegaMenuState(true);
                }}
              ></div>
              <i className="fa-regular fa-grid-2"></i>
            </SMButton>
            <SMButton>
              <div className={classes.cartWrapper}>
                <Link to={"/cart"}>
                  {count > 0 && (
                    <span className={classes.CartCount}>{count}</span>
                  )}
                  <i className="fa-regular fa-cart-shopping"></i>
                </Link>
              </div>
            </SMButton>

            <SMButton>
              <div
                className={classes.absoluteBtn}
                onClick={() => {
                  setUserDropdown(!userDropdown);
                }}
                ref={userBtnRef}
              ></div>
              <i className="fa-regular fa-user"></i>
            </SMButton>

            <UserDropdown dropdownRef={dropdownRef} state={userDropdown} />
          </div>

          <MegaMenu
            setMegaMenuState={setMegaMenuState}
            megaMenuState={megaMenuState}
          />
        </div>
      </header>
      {/* The dark background behind "Mega menu" that closes "Mega menu" when clicked. */}
      <div
        className={`${classes.backdrop} ${megaMenuState ? classes.show : null}`}
        onClick={() => {
          setMegaMenuState(false);
        }}
      ></div>
    </>
  );
}
