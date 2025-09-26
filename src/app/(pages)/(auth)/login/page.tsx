"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import ForgotPasswordDialog from "../../../../components/auth/ForgotPasswordDialog/ForgotPasswordDialog";

const schema = z.object({
  email: z.string().nonempty("Email is required").email("Email is not valid"),
  password: z.string().nonempty("password is required"),
});

export default function Login() {
  const [errorMsgWhenSubmit, setErrorMsgWhenSubmit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  //   function to handle login
  async function handleLogin(values: { email: string; password: string }) {
    setErrorMsgWhenSubmit("");
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.ok) {
      router.push("/products");
      toast.success("Welcome");
    } else {
      setErrorMsgWhenSubmit("Incorrect email or password");
    }
    setIsLoading(false);
  }

  return (
    <div className=" my-5 w-[90%] lg:w-[50%] mx-auto rounded-md shadow-lg p-5  backdrop-blur-xl border  ">
      <h2 className="text-2xl font-semibold text-center text-gray-600 mb-5">
        Login
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorMsgWhenSubmit && (
            <p
              className={`text-lg text-red-500 bg-gray-200 border rounded-md text-center p-1`}
            >
              {errorMsgWhenSubmit ? errorMsgWhenSubmit : ""}
            </p>
          )}

          <Separator />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader className="animate-spin" />}
            Login
          </Button>
          <div className="flex flex-row justify-center gap-3 items-center">
            <p className="hover:underline hover:text-blue-500 underline ">
              <Link href={"/register"}>{"Register"}</Link>
            </p>

            {"|"}
            <ForgotPasswordDialog />
          </div>
        </form>
      </Form>
    </div>
  );
}
