import classes from "./Search.module.css";

export default function Search() {
  return (
    <div className={classes.search}>
      <input type="text" placeholder="Search..." />
      <button className={classes.searchIcon}>
        <i class="fa-regular fa-magnifying-glass"></i>
      </button>
    </div>
  );
}
