import classes from "./Profile.module.css";

export default function Profile({ size, imageAddress, alt }) {
  return (
    <figure className={classes.profile} style={{ width: size, height: size }}>
      <img src={imageAddress} alt={alt} />
    </figure>
  );
}
