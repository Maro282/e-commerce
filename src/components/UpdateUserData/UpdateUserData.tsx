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
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { Session } from "inspector/promises";

// interface
interface Ivalues {
  name: string;
  email: string;
  phone: string;
}

// schema
const schema = z.object({
  name: z
    .string()
    .nonempty("UserName is required")
    .min(3, "minimum length is 3"),
  email: z.string().nonempty("Email is required").email("Email is not valid"),
  phone: z
    .string()
    .nonempty("Phone is required")
    .regex(/^01[0-25][0-9]{8}$/, "invalid phone number"),
});

export default function UpdateUserData() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  // function to handle update user data
  async function handleUpdateUserData(values: Ivalues) {
    setIsLoading(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe",
      {
        method: "put",
        headers: {
          token: "",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
        }),
      }
    )
      .then((res) => res.json())
      .catch((error) => error);

    if (response.message == "success") {
      toast.success("Data updated successfully");
      signOut({ callbackUrl: "/login" });
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  }

  return (
    <div className=" flex flex-col py-5">
      <h2 className="text-2xl font-semibold text-red-700">Edit your data</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateUserData)}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-2 gap-y-4 p-2 mt-4">
            {/* User name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your email address"
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
          </div>
          <Button type="submit" className="w-full mb-2" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="animate-spin" /> {"Updating "}
              </>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
