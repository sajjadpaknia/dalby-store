import Container from "../../Common/Container/Container";
import Header from "../../Components/Header/Header";
import { useGlobalState } from "../../Context/Context";
import classes from "./Home.module.css";
export default function Home() {
  const context = useGlobalState();
  console.log(context);
  return (
    <>
      <h1 style={{ fontSize: "5rem" }}></h1>
      <Container>
        <Header />
      </Container>
    </>
  );
}
