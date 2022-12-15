import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackBtn from "../../Common/BackBtn/BackBtn";
import Button from "../../Common/Button/Button";
import MessageBox from "../../Common/MessageBox/MessageBox";
import RegisterCard from "../../Common/RegisterCard/RegisterCard";
import Spinner from "../../Common/Spinner/Spinner";
import classes from "./SignUp.module.css";
import validation from "./validation";

export default function SignUp() {
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
    step3: false,
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
  // Name state
  const [name, setName] = useState({
    name: "",
    error: false,
    errorText: "",
  });

  // When the "Inputs" are entered correctly and the "Submit" button is pressed, "handleSubmit()" will run.
  // This function is a "async" function.
  const handleSubmit = async () => {
    // First, all elements inside the form fail.
    document.getElementById("signUpSubmitBtn").disabled = true;
    document.getElementById("signUpForm").style.pointerEvents = "none";
    // Spinner => true
    setSpinner(true);
    // All user information is placed in "data" to be sent to the server.
    const data = {
      email: email.email,
      password: password.password,
      name: name.name,
    };
    // Post "data"
    await axios
      .post("/users", data)
      .then((res) => {
        // Spinner => false
        setSpinner(false);
        setMessage({
          ...message,
          show: true,
          messageTitle: "Welcome to our store.",
          messageSubTitle: "We’re happy to have you on board.",
        });
        localStorage.setItem(
          "auth-user",
          JSON.stringify({
            email: res.data.email,
            name: res.data.name,
          })
        );
        setTimeLeft(5);
      })
      .catch(() => {
        setSpinner(false);
        setMessage({
          ...message,
          show: true,
          error: true,
          messageTitle: "Sorry, an error has occurred.",
          messageSubTitle: "Please try again.",
        });
      });
  };
  // JSX 
  return (
    <RegisterCard spinner={spinner} backToHome={backToHomeBtn}>
      {!message.show ? (
        <>
          <figure className={classes.logo}>
            <img src="./assets/svg/light-logo.svg" alt="logo" />
          </figure>
          <form className={classes.form} spellCheck={false} id="signUpForm">
            <div
              className={`${classes.bodyWrapper}
            ${showStep.step1 ? classes.step1 : ""}
            ${showStep.step2 ? classes.step2 : ""}
            ${showStep.step3 ? classes.step3 : ""}`}
            >
              <section
                className={`${classes.body}
              ${showStep.step1 ? null : classes.hide}`}
              >
                <h1>Create account</h1>
                <fieldset className={classes.inputWrapper}>
                  <input
                    autoFocus
                    className={`${classes.input} ${
                      email.error ? classes.error : null
                    }`}
                    type="text"
                    placeholder="someone@example.com"
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document.getElementById("emailBtn").click();
                      }
                    }}
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
                    <p className={classes.dispatch}> Do you have an account?</p>
                    <Link to={"/login"}>Login</Link>
                  </div>
                </fieldset>
                <div className={classes.btnGroup}>
                  <Button>
                    <button
                      id="emailBtn"
                      className={classes.btns}
                      onClick={(e) => {
                        e.preventDefault();
                        validation(
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
                      id="passwordInput"
                      className={`${classes.input} ${
                        password.error ? classes.error : null
                      }`}
                      type={showPassword ? "text" : "password"}
                      placeholder="e.g. d5y2a9R4"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          document.getElementById("passwordBtn").click();
                        }
                      }}
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
                </fieldset>
                <div className={`${classes.btnGroup} ${classes.flex}`}>
                  <BackBtn>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setShowStep({
                          step1: true,
                          step2: false,
                          step3: false,
                        });
                      }}
                    >
                      <i className="fa-regular fa-chevron-left"></i>
                    </div>
                  </BackBtn>
                  <Button>
                    <button
                      id="passwordBtn"
                      className={classes.btns}
                      onClick={(e) => {
                        e.preventDefault();
                        validation(
                          "password",
                          password,
                          setPassword,
                          setShowStep,
                          handleSubmit,
                          setSpinner
                        );
                      }}
                    >
                      Next
                    </button>
                  </Button>
                </div>
              </section>
              <section
                className={`   ${classes.body}
              ${showStep.step3 ? null : classes.hide}`}
              >
                <h1>What’s your name ?</h1>
                <fieldset className={classes.inputWrapper}>
                  <input
                    id="nameInput"
                    className={`${classes.input} ${
                      name.error ? classes.error : null
                    }`}
                    type="text"
                    placeholder="e.g. John Doe"
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        document.getElementById("signUpSubmitBtn").click();
                      }
                    }}
                    onChange={(e) => {
                      setName({
                        ...name,
                        name: e.target.value.toLowerCase(),
                      });
                    }}
                  />
                  {name.error && (
                    <p className={classes.textError}>{name.errorText}</p>
                  )}
                </fieldset>
                <div className={`${classes.btnGroup} ${classes.flex}`}>
                  <BackBtn>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setShowStep({
                          step1: false,
                          step2: true,
                          step3: false,
                        });
                      }}
                    >
                      <i className="fa-regular fa-chevron-left"></i>
                    </div>
                  </BackBtn>

                  <Button>
                    <button
                      id="signUpSubmitBtn"
                      type="submit"
                      className={classes.btns}
                      onClick={(e) => {
                        e.preventDefault();
                        setBackToHomeBtn(false);
                        validation(
                          "name",
                          name,
                          setName,
                          setShowStep,
                          handleSubmit,
                          setSpinner
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
