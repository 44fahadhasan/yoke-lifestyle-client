import { cn } from "@/lib/utils";

const Container = ({ children, className, ...props }) => {
  return (
    <section
      className={cn("container w-[87%] mx-auto py-10 lg:py-20", className)}
      {...props}
    >
      {children}
    </section>
  );
};

export default Container;
