"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";

interface Ivalues {
  currentPassword: string;
  password: string;
  rePassword: string;
}

const schema = z
  .object({
    currentPassword: z.string().nonempty("required"),
    password: z
      .string()
      .nonempty("new password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,}$/,
        "Please follow password creation instructions "
      ),
    rePassword: z.string().nonempty("Re-password is required"),
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

export default function ResetPassword() {
  // dialog status
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  //   dialog messages state
  const [error, setError] = useState("");

  // logged user data
  const x = useSession();

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // Fuction handle reset Password
  async function handleResetPassword(values: Ivalues) {
    setIsLoading(true);
    setError("");
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "put",
        headers: {
          token: x.data?.token ??"",
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      }
    ).then((res) => res.json());

    if (response?.statusMsg == "fail") {
      setError(response?.message);
    } else {
      if (response?.message == "fail") {
        setError(response.errors.msg);
      } else {
        toast.success(
          "Password updated successfully we redirecting you to the login page"
        );
        form.reset();
        cancelProcess();

        signOut({
          callbackUrl: "/login",
        });
      }
    }

    setIsLoading(false);
  }

  // cancel the process function
  function cancelProcess() {
    setError("");
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger
        className=" hover:underline"
        onClick={() => {
          setOpen(true);
        }}
      >
        Reset password
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>
            Pick a secure password min 8 characters and contain one lowercase ,
            uppercase , special character and a digit
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Error area */}
          {error && (
            <div className=" bg-red-100 p-2 rounded-lg border text-center">
              <p className="text-red-500 font-semibold ">{error}</p>
            </div>
          )}
          {/* Input field according to step */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleResetPassword)}
              className="space-y-4"
            >
              {/* current Field */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current password</FormLabel>
                    <FormControl>
                      <Input placeholder="Current password" {...field} />
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader className="animate-spin" />}
                Reset
              </Button>
            </form>
          </Form>
        </div>

        <DialogFooter>
          <Button
            className="bg-red-500 text-white hover:bg-red-600 w-full"
            disabled={isLoading}
            onClick={() => {
              cancelProcess();
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
