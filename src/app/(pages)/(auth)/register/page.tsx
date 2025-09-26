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
import { IFormValues } from "@/interfaces";
import { signUp } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import Link from "next/link";

const schema = z
  .object({
    name: z.string().nonempty("name is required").min(3, "minimum length is 3"),
    email: z.string().nonempty("Email is required").email("Email is not valid"),
    password: z
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,}$/,
        "password must be at least 8 and contain one lowercase , uppercase , special character and a digit  "
      ),
    rePassword: z.string().nonempty("Re-password is required"),
    phone: z
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0-25][0-9]{8}$/, "invalid phone number"),
  })
  .refine(
    (values) => {
      if (values.password == values.rePassword) {
        return true;
      }
      return false;
    },
    {
      message: "Not match",
      path: ["rePassword"],
    }
  );

export default function Register() {
  const [errorMsgWhenSubmit, setErrorMsgWhenSubmit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  //   function to handle register
  async function handleRegister(values: IFormValues) {
    setErrorMsgWhenSubmit("");
    setIsLoading(true);
    const response = await signUp(values);
    if (response.message == "success") {
      router.push("/login");
      toast.success("Registered Successfully . . ");
    } else {
      setErrorMsgWhenSubmit(response.message);
    }

    setIsLoading(false);
  }

  return (
    <div className=" my-5 w-[90%] lg:w-[50%] mx-auto rounded-md shadow-lg p-5  backdrop-blur-xl border  ">
      <h2 className="text-2xl font-semibold text-center text-gray-600 mb-5">
        Join us and shop your favorites !{" "}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="space-y-4"
        >
          {/* name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* repassword Field */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone" {...field} />
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
            SignUp
          </Button>

          <div className="flex flex-row justify-center items-center">
            <p className="hover:underline text-blue-500 hover:text-blue-700 underline">
              <Link href={"/login"}>{"Already have account"}</Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
