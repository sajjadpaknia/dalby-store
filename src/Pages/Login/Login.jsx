import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackBtn from "../../Common/BackBtn/BackBtn";
import Button from "../../Common/Button/Button";
import MessageBox from "../../Common/MessageBox/MessageBox";
import RegisterCard from "../../Common/RegisterCard/RegisterCard";
import Spinner from "../../Common/Spinner/Spinner";
import classes from "./Login.module.css";
import handleNext from "./validation";

export default function Login() {
  const navigate = useNavigate();
  // After the end of the operation, it reports the result.
  // If "message" is set to "true", the "Message component" will be displayed.
  const [message, setMessage] = useState({
    show: false,
    error: false,
    messageTitle: "",
    messageSubTitle: "",
  });
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/");
      setTimeLeft(null);
    }
    // exit early when we reach 0
    if (!timeLeft) return;
    // save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    // clear interval on re-render to avoid memory leaks
    return () => {
      clearInterval(intervalId);
    };
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);
  // If "backToHomeBtn" was "true", the "backToHomeBtn" button will be displayed.
  const [backToHomeBtn, setBackToHomeBtn] = useState(true);
  // After clicking on the "Next" button, the next step will be displayed.
  const [showStep, setShowStep] = useState({
    step1: true,
    step2: false,
  });
  // If it is "true", "Spinner" will be activated.
  const [spinner, setSpinner] = useState(false);
  // If it is "true", text of password will be displayed.
  const [showPassword, setShowPassword] = useState(false);
  // Email state
  const [email, setEmail] = useState({
    email: "",
    error: false,
    errorText: "",
  });
  // Password state
  const [password, setPassword] = useState({
    password: "",
    error: false,
    errorText: "",
  });

  // When the "Inputs" are entered correctly and the "Submit" button is pressed, "handleSubmit()" will run.
  // This function is a "async" function.
  const handleSubmit = () => {
    // First, all elements inside the form fail.
    document.getElementById("LoginSubmitBtn").disabled = true;
    document.getElementById("LoginForm").style.pointerEvents = "none";
    // Spinner => true
    setSpinner(false);
    setMessage({
      ...message,
      show: true,
      messageTitle: "Welcome to our store.",
      messageSubTitle: "We’re happy to have you on board.",
    });
    setTimeLeft(5);
  };
  // JSX
  return (
    <RegisterCard spinner={spinner} backToHome={backToHomeBtn}>
      {!message.show ? (
        <>
          <figure className={classes.logo}>
            <img src="./assets/svg/light-logo.svg" alt="logo" />
          </figure>
          <form className={classes.form} spellCheck={false} id="LoginForm">
            <div
              className={`${classes.bodyWrapper}
            ${showStep.step1 ? classes.step1 : ""}
            ${showStep.step2 ? classes.step2 : ""}
       `}
            >
              <section
                className={`${classes.body}
              ${showStep.step1 ? null : classes.hide}`}
              >
                <h1>Login</h1>
                <fieldset className={classes.inputWrapper}>
                  <input
                    className={`${classes.input} ${
                      email.error ? classes.error : null
                    }`}
                    type="text"
                    placeholder="Email address"
                    onChange={(e) => {
                      setEmail({
                        ...email,
                        email: e.target.value,
                      });
                    }}
                  />
                  {email.error && (
                    <p className={classes.textError}>{email.errorText}</p>
                  )}
                  <div className={classes.context}>
                    <p className={classes.dispatch}> No account?</p>
                    <Link to={"/signup"}>Let's create!</Link>
                  </div>
                </fieldset>
                <div className={classes.btnGroup}>
                  <Button>
                    <button
                      className={classes.btns}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNext(
                          "email",
                          email,
                          setEmail,
                          setShowStep,
                          handleSubmit,
                          setSpinner,
                          setMessage
                        );
                      }}
                    >
                      {spinner ? (
                        <Spinner size={"20px"} borderSize={"2px"} />
                      ) : (
                        "Next"
                      )}
                    </button>
                  </Button>
                </div>
              </section>
              <section
                className={`   ${classes.body}
              ${showStep.step2 ? null : classes.hide}`}
              >
                <h1>Enter password</h1>
                <fieldset className={classes.inputWrapper}>
                  <div className={classes.passwordWrapper}>
                    <input
                      className={`${classes.input} ${
                        password.error ? classes.error : null
                      }`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      onChange={(e) => {
                        setPassword({
                          ...password,
                          password: e.target.value,
                        });
                      }}
                    />
                    <div
                      className={classes.iconWrapper}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <i className="fa-regular fa-eye-slash"></i>
                      ) : (
                        <i className="fa-regular fa-eye"></i>
                      )}
                    </div>
                  </div>
                  {password.error && (
                    <p className={classes.textError}>{password.errorText}</p>
                  )}
                  <div className={`${classes.context} ${classes.right}`}>
                    <Link to={"#"}>Forgot password?</Link>
                  </div>
                </fieldset>
                <div className={`${classes.btnGroup} ${classes.flex}`}>
                  <BackBtn>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setShowStep({ step1: true, step2: false });
                      }}
                    >
                      <i className="fa-regular fa-chevron-left"></i>
                    </div>
                  </BackBtn>
                  <Button>
                    <button
                      id="LoginSubmitBtn"
                      type="submit"
                      className={classes.btns}
                      onClick={(e) => {
                        e.preventDefault();
                        setBackToHomeBtn(false);
                        handleNext(
                          "password",
                          password,
                          setPassword,
                          null,
                          handleSubmit,
                          setSpinner,
                          setMessage
                        );
                      }}
                    >
                      {spinner ? (
                        <Spinner size={"20px"} borderSize={"2px"} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </Button>
                </div>
              </section>
            </div>
          </form>
        </>
      ) : (
        <div className={classes.message}>
          <MessageBox
            error={message.error}
            messageTitle={message.messageTitle}
            messageSubTitle={message.messageSubTitle}
          />
          {message.error ? (
            <div
              style={{
                color: "var(--color-primary)",
                width: " 100%",
                marginTop: "5rem",
              }}
            >
              <Link to={"/"}>Back to Home</Link>
            </div>
          ) : (
            <div className={classes.timer}>
              We’re preparing your account.
              <span>&nbsp;{timeLeft}</span> seconds
            </div>
          )}
        </div>
      )}
    </RegisterCard>
  );
}
