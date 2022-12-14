import axios from "axios";

let loggedUser = [];
const handleNext = (
  input,
  state,
  setState,
  setStep,
  handleSubmit,
  setSpinner,
  setMessage
) => {
  if (input === "email") {
    const valid = String(state.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!valid) {
      if (state.email === "") {
        setState({ ...state, error: true, errorText: "Email is required." });
      } else {
        setState({
          ...state,
          error: true,
          errorText: "Sorry, your email doesn't right.",
        });
      }
      return;
    } else {
      setSpinner(true);
      const isThereEmail = async () => {
        await axios
          .get("/users")
          .then((res) => {
            const user = res.data.find((item) => item.email === state.email);
            if (user) {
              loggedUser = user;
              setSpinner(false);
              setState({ ...state, error: false, errorText: "" });
              setStep({ step1: false, step2: true });
              return;
            }
            setState({
              ...state,
              error: true,
              errorText: "Sorry, your email doesn't exist.",
            });
            setSpinner(false);
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
    return;
  } else if (input === "password") {
    if (state.password === "") {
      setState({
        ...state,
        error: true,
        errorText: "Password is required.",
      });
    } else {
      setSpinner(true);
      if (loggedUser.password === state.password) {
        setState({ ...state, error: false, errorText: "" });
        handleSubmit();
        return;
      }
      setSpinner(false);
      setState({
        ...state,
        error: true,
        errorText: "Sorry, your password doesn't right.",
      });
    }
  }
};

export default handleNext;
