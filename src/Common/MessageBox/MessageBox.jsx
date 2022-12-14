import classes from "./MessageBox.module.css";

export default function MessageBox(props) {
  return (
    <div className={classes.container}>
      <div className={classes.icon}>
        {!props.error ? (
          <div className={classes.tick}>
            <div>
              <div>
                <i className="fa-sharp fa-solid fa-check"></i>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.error}>
            <div>
              <div>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={classes.messages}>
        <p className={classes.boldMessage}>{props.messageTitle}</p>
        <p className={classes.subMessage}>{props.messageSubTitle}</p>
      </div>
    </div>
  );
}
