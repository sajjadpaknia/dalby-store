import axios from "axios";

let loggedUser;
const validation = (
  input,
  state,
  setState,
  setStep,
  handleSubmit,
  setSpinner,
  setMessage
) => {
  if (input === "email") {
    emailValidation(state, setState, setStep, setSpinner, setMessage);
    return;
  } else if (input === "password") {
    passwordValidation(state, setState, handleSubmit);
    return;
  }
};
// Email validation function
function emailValidation(state, setState, setStep, setSpinner, setMessage) {
  const valid = String(state.email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!valid) {
    if (state.email === "") {
      setState({ ...state, error: true, errorText: "Email is required." });
      return;
    }
    setState({
      ...state,
      error: true,
      errorText: "Sorry, your email doesn't right.",
    });
    return;
  }
  setSpinner(true);
  const isThereEmail = async () => {
    await axios
      .get("/users")
      .then((res) => {
        const user = res.data.find((item) => item.email === state.email);
        console.log(user);
        if (user) {
          loggedUser = user;
          setSpinner(false);
          setState({ ...state, error: false, errorText: "" });
          setStep({ step1: false, step2: true });
          return;
        }
        setSpinner(false);
        setState({
          ...state,
          error: true,
          errorText: "Sorry, your email doesn't exist.",
        });
      })
      .catch(() => {
        setSpinner(false);
        setMessage({
          show: true,
          error: true,
          messageTitle: "Sorry, an error has occurred.",
          messageSubTitle: "Please try again.",
        });
      });
  };
  isThereEmail();
}
// Password validation function
function passwordValidation(state, setState, handleSubmit) {
  if (state.password === "") {
    setState({
      ...state,
      error: true,
      errorText: "Password is required.",
    });
    return;
  }
  if (loggedUser.password === state.password) {
    setState({ ...state, error: false, errorText: "" });
    handleSubmit(loggedUser);
    return;
  }
  setState({
    ...state,
    error: true,
    errorText: "Sorry, your password doesn't right.",
  });
}
export default validation;
