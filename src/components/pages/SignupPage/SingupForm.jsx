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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";

const SingupForm = () => {
  const [hintDropdownOpen, setHintDropdownOpen] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [signal, setSignal] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
    strong: false,
  });
  const [loading, setLoading] = useState(false);

  // handle strong password checker
  const handleStrongPasswordChecker = (e) => {
    const password = e.target.value;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setSignal({
      lowercase: hasLowerCase,
      uppercase: hasUpperCase,
      number: hasNumber,
      symbol: hasSymbol,
      length: password.length >= 8,
      strong:
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSymbol &&
        password.length >= 8,
    });
  };

  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  // handle new user signup
  const onSubmit = async (data) => {
    setLoading(true);

    const newUserInfo = {
      full_name: data.full_name,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
    };

    try {
      const { data } = await axiosPublic.post("/api/users/signup", newUserInfo);

      if (data.success) {
        toast.success(data.message, {
          description: "Please login to continue.",
          action: {
            label: "Login",
            onClick: () => router.push("/login"),
          },
        });

        // clear inputs
        resetField("full_name");
        resetField("email");
        resetField("mobile");
        resetField("password");
      }
    } catch ({ response }) {
      toast.error(response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Signup a new account</CardTitle>
            <CardDescription>
              Let’s get started and unlock amazing features together!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  {/* full name */}
                  <div className="grid gap-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      {...register("full_name", { required: true })}
                      id="full_name"
                      type="text"
                      placeholder="Write your full name"
                    />
                    {errors.full_name && (
                      <TypographySmall className="text-[#FA4B35] text-xs">
                        Full name is required
                      </TypographySmall>
                    )}
                  </div>

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

                  {/* mobile */}
                  <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      {...register("mobile", {
                        required: true,
                      })}
                      id="mobile"
                      type="tel"
                      placeholder="Write your moblie number"
                    />
                    {errors?.mobile?.type === "required" && (
                      <TypographySmall className="text-[#FA4B35] text-xs">
                        Mobile number is required
                      </TypographySmall>
                    )}
                  </div>

                  {/* password */}
                  <div className="grid gap-2 relative">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        {...register("password", {
                          required: true,
                          pattern:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                        })}
                        onChange={(e) => {
                          handleStrongPasswordChecker(e);
                          setValue("password", e.target.value);
                          trigger("password");
                        }}
                        onFocus={() => setHintDropdownOpen(true)}
                        onBlur={() => {
                          setHintDropdownOpen(false);
                          trigger("password");
                        }}
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
                    {errors?.password?.type === "pattern" && (
                      <TypographySmall className="text-[#FA4B35] text-xs">
                        Please write a strong password
                      </TypographySmall>
                    )}

                    {/* strong password checker popup */}
                    <div
                      className={`${
                        hintDropdownOpen
                          ? "opacity-100 translate-y-0 z-30"
                          : "opacity-0 translate-y-[-10px] z-[-1]"
                      } bg-white shadow-md rounded-md py-3 px-4 absolute top-[60px] left-0 w-full transition-all duration-300`}
                    >
                      <TypographySmall>
                        Your password must contain:
                      </TypographySmall>

                      <div className="w-full mt-2 flex-col flex gap-[6px]">
                        <div
                          className={`${
                            signal.length ? "text-green-500" : "text-gray-500"
                          } text-[0.8rem] flex items-center gap-[8px]`}
                        >
                          {signal.length ? (
                            <MdDone className={`text-[1rem]`} />
                          ) : (
                            <RxCross1 />
                          )}
                          Minimum number of characters is 8.
                        </div>
                        <div
                          className={`${
                            signal.uppercase
                              ? "text-green-500"
                              : "text-gray-500"
                          } text-[0.8rem] flex items-center gap-[8px]`}
                        >
                          {signal.uppercase ? (
                            <MdDone className={`text-[1rem]`} />
                          ) : (
                            <RxCross1 />
                          )}
                          Should contain uppercase.
                        </div>
                        <div
                          className={`${
                            signal.lowercase
                              ? "text-green-500"
                              : "text-gray-500"
                          } text-[0.8rem] flex items-center gap-[8px]`}
                        >
                          {signal.lowercase ? (
                            <MdDone className={`text-[1rem]`} />
                          ) : (
                            <RxCross1 />
                          )}
                          Should contain lowercase.
                        </div>
                        <div
                          className={`${
                            signal.number ? "text-green-500" : "text-gray-500"
                          } text-[0.8rem] flex items-center gap-[8px]`}
                        >
                          {signal.number ? (
                            <MdDone className={`text-[1rem]`} />
                          ) : (
                            <RxCross1 />
                          )}
                          Should contain numbers.
                        </div>
                        <div
                          className={`${
                            signal.symbol ? "text-green-500" : "text-gray-500"
                          } text-[0.8rem] flex items-center gap-[8px]`}
                        >
                          {signal.symbol ? (
                            <MdDone className={`text-[1rem]`} />
                          ) : (
                            <RxCross1 />
                          )}
                          Should contain special characters.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* button */}
                  <Button disabled={loading} type="submit" className="w-full">
                    {loading ? (
                      <LoadingButton>Please wait</LoadingButton>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>

                <TypographySmall className="font-normal">
                  If you already have an account with us, please{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </TypographySmall>
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

export default SingupForm;
