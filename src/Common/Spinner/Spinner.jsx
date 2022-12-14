import classes from "./Spinner.module.css";

export default function Spinner({ size, borderSize }) {
  const style = {
    width: size,
    height: size,
    border: `${borderSize} solid #f3f3f3`,
    borderTop: `${borderSize} solid #3498db`,
  };
  return <div className={classes.spinner} style={style}></div>;
}
