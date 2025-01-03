import Container from "@/components/reusable/Container";
import ScaleLoader from "react-spinners/ScaleLoader";

const LoadingPage = () => {
  return (
    <Container className="flex justify-center items-center">
      <ScaleLoader />
    </Container>
  );
};

export default LoadingPage;
