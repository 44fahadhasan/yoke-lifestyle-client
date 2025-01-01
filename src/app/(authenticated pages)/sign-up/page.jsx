import SingupForm from "@/components/pages/SignupPage/SingupForm";
import Container from "@/components/reusable/Container";

const SingupPage = () => {
  return (
    <Container className="flex min-h-svh flex-col items-center justify-center py-6 lg:py-10">
      <SingupForm />
    </Container>
  );
};

export default SingupPage;
