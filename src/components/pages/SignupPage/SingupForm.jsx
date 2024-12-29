"use client";
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
import Link from "next/link";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const SingupForm = () => {
  const [hintDropdownOpen, setHintDropdownOpen] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [StrongPassword, setStrongPassword] = useState("");
  const [signal, setSignal] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
    strong: false,
  });

  const handleStrongPasswordChecker = (e) => {
    const password = e.target.value;
    setStrongPassword(password);

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

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Signup a new account</CardTitle>
          <CardDescription>
            Let’s get started and unlock amazing features together!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input id="mobile" type="tel" placeholder="" required />
                </div>
                <div className="grid gap-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    onChange={handleStrongPasswordChecker}
                    onFocus={() => setHintDropdownOpen(true)}
                    onBlur={() => {
                      setHintDropdownOpen(false);
                    }}
                    id="password"
                    type={isEyeOpen ? "text" : "password"}
                    required
                  />

                  <div
                    className={`${
                      hintDropdownOpen
                        ? "opacity-100 translate-y-0 z-30"
                        : "opacity-0 translate-y-[-10px] z-[-1]"
                    } bg-white shadow-md rounded-md py-3 px-4 absolute top-[60px] left-0 w-full transition-all duration-300`}
                  >
                    <h3 className="text-gray-900 font-[500] text-[1rem]">
                      Your password must contain:
                    </h3>

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
                          signal.uppercase ? "text-green-500" : "text-gray-500"
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
                          signal.lowercase ? "text-green-500" : "text-gray-500"
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
                  {isEyeOpen ? (
                    <IoEyeOutline
                      className=" absolute top-[46%] right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                      onClick={() => setIsEyeOpen(false)}
                    />
                  ) : (
                    <IoEyeOffOutline
                      className=" absolute top-[46%] right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                      onClick={() => setIsEyeOpen(true)}
                    />
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
              <div className="text-center text-sm">
                If you already have an account with us, please{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Logn
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default SingupForm;
