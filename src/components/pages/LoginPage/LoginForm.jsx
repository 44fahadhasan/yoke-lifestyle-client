"use client";
import LoadingButton from "@/components/reusable/LoadingButton";
import TypographySmall from "@/components/reusable/Typography/TypographySmall";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from "sonner";
// import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  // handle user login
  const onSubmit = async (data) => {
    setLoading(true);

    const userCredentials = {
      email: data.email,
      password: data.password,
    };

    try {
      const { data } = await axiosPublic.post(
        "/api/users/login",
        userCredentials
      );

      if (data.success) {
        toast.success(data.message);

        // user data save to local storage
        localStorage.setItem("userData", JSON.stringify(data.data));
      }
    } catch ({ response }) {
      toast.error(response.data.message);
    } finally {
      // clear inputs
      resetField("email");
      resetField("password");

      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your credentials
              {/* your Facebook or Google account */}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* login by socials platform */}
            {/* <div className="space-y-6 mb-6">
              <SocialLogin /> */}

            {/* divider */}
            {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div> */}

            {/* login by credentials */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  {/* email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email", { required: true })}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                    />
                    {errors.email && (
                      <TypographySmall className="text-[#FA4B35] text-xs">
                        Email is required
                      </TypographySmall>
                    )}
                  </div>

                  {/* password */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        {...register("password", {
                          required: true,
                        })}
                        id="password"
                        type={isEyeOpen ? "text" : "password"}
                        placeholder="********"
                      />

                      {/* eye icons */}
                      {isEyeOpen ? (
                        <IoEyeOutline
                          className="absolute top-[50%] -translate-y-[50%] right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                          onClick={() => setIsEyeOpen(false)}
                        />
                      ) : (
                        <IoEyeOffOutline
                          className=" absolute top-[50%] -translate-y-[50%] right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                          onClick={() => setIsEyeOpen(true)}
                        />
                      )}
                    </div>

                    {errors?.password?.type === "required" && (
                      <TypographySmall className="text-[#FA4B35] text-xs">
                        Password is required
                      </TypographySmall>
                    )}
                  </div>

                  {/* button */}
                  <Button disabled={loading} type="submit" className="w-full">
                    {loading ? <LoadingButton>loading</LoadingButton> : "Login"}
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4">
          You agree to our{" "}
          <Link href="/terms-&-conditions" className="hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="hover:text-primary">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
