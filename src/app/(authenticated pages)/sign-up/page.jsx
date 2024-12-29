import SingupForm from "@/components/pages/SignupPage/SingupForm";

const SingupPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SingupForm />
      </div>
    </div>
  );
};

export default SingupPage;
