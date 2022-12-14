import axios from "axios";

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
    }
    setSpinner(true);
    const isThereEmail = async () => {
      await axios
        .get("/users")
        .then((res) => {
          const user = res.data.find((item) => item.email === state.email);
          if (user) {
            setState({
              ...state,
              error: true,
              errorText: "This email is already associated with an account.",
            });
            setSpinner(false);
            return;
          }
          setSpinner(false);
          setState({ ...state, error: false, errorText: "" });
          setStep({ step1: false, step2: true });
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
    return;
  } else if (input === "password") {
    const valid = String(state.password).match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
    );
    if (!valid) {
      if (
        state.password === "" ||
        state.password.length < 8 ||
        state.password.length > 20
      ) {
        setState({
          ...state,
          error: true,
          errorText: "Password must be between 8 and 20 characters.",
        });
      } else {
        setState({
          ...state,
          error: true,
          errorText: "Sorry, your password doesn't right.",
        });
      }
      return;
    }
    setState({ ...state, error: false, errorText: "" });
    setStep({ step1: false, step2: false, step3: true });
    return;
  } else if (input === "name") {
    const valid = String(state.name).match(/^[a-zA-Z]+ [a-zA-Z]+$/);
    if (!valid) {
      if (state.name === "") {
        setState({
          ...state,
          error: true,
          errorText: "Name is required.",
        });
      } else {
        setState({
          ...state,
          error: true,
          errorText: "Please enter your full name (first & last name).",
        });
      }
      return;
    }

    setState({ ...state, error: false, errorText: "" });
    handleSubmit();
  }
};
export default handleNext;
