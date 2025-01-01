import LoginForm from "@/components/pages/LoginPage/LoginForm";
import Container from "@/components/reusable/Container";

const LoginPage = () => {
  return (
    <Container className="flex min-h-svh flex-col items-center justify-center py-6 lg:py-10">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
