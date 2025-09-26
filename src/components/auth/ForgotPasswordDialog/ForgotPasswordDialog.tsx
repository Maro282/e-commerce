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
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader, X } from "lucide-react";
import { tr } from "zod/v4/locales";

export default function ForgotPasswordDialog() {
  // dialog status
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // dialog steps
  const [step, setStep] = useState<"email" | "code" | "newPassword" | "done">(
    "email"
  );

  //   dialog messages state
  const [error, setError] = useState("");

  //   dialog states
  const [email, setEmail] = useState("");
  const [code, setcode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //   Function to handle send reset code
  async function handleSendResetcode() {
    setError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter valid email");
      return;
    }

    setIsLoading(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    )
      .then((res) => res.json())
      .catch((error) => error);

    if (response.statusMsg == "success") {
      setStep("code");
    } else {
      setError(response.message);
    }

    setIsLoading(false);
  }

  // function to verify code
  async function verifyResetcode() {
    setError("");
    if (!code) {
      setError("Please enter the code");
      return;
    }

    setIsLoading(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          resetCode: code,
        }),
      }
    )
      .then((res) => res.json())
      .catch((error) => error);

    if (response.status === "Success") {
      setStep("newPassword");
    } else {
      setError("something goes wrong");
    }

    setIsLoading(false);
  }

  // async function to reset password
  async function resetPassword() {
    setError("");
    if (
      !newPassword ||
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,}$/.test(newPassword)
    ) {
      setError("Please follow password instructions");
      return;
    }

    setIsLoading(true);
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      }
    )
      .then((res) => res.json())
      .catch((error) => error);

    if (response.statusMsg != "fail") {
      setStep("done");
    } else {
      setError("something goes wrong may be the code expired");
    }

    setIsLoading(false);
  }

  // cancel the process function
  function cancelProcess() {
    setStep("email");
    setError("");
    setEmail("");
    setcode("");
    setNewPassword("");
  }

  return (
    <Dialog open={open}>
      <DialogTrigger
        className="text-red-500 hover:underline"
        onClick={() => {
          setOpen(true);
        }}
      >
        Forget password
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step == "email"
              ? "1- Reset your password"
              : step == "code"
              ? "2- Enter reset code"
              : step == "newPassword"
              ? "3- Choose a new password"
              : "All set!"}
          </DialogTitle>

          <DialogDescription>
            {step === "email" &&
              "Enter your account email and we will send a reset code."}
            {step === "code" && "Type the code sent to your email."}
            {step === "newPassword" &&
              "Pick a secure password (min 8 characters  and contain one lowercase , uppercase , special character and a digit)."}
            {step === "done" && "Password reset successfully."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-3">
          {/* Error area */}
          {error && (
            <div className=" bg-red-100 p-2 rounded-lg border text-center">
              <p className="text-red-500 font-semibold ">{error}</p>
            </div>
          )}

          {/* Input field according to step */}
          {step == "email" && (
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Your Email account"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleSendResetcode();
                  }
                }}
              />
            </div>
          )}

          {step == "code" && (
            <div className="space-y-2">
              <Label>Reset code</Label>
              <Input
                type="text"
                placeholder="xxxxx"
                value={code}
                onChange={(e) => {
                  setcode(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    verifyResetcode();
                  }
                }}
              />
            </div>
          )}

          {step == "newPassword" && (
            <div className="space-y-2">
              <Label>New password</Label>
              <Input
                type="text"
                placeholder="xxxxx"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    resetPassword();
                  }
                }}
              />
            </div>
          )}

          {step === "done" && (
            <div className="text-sm text-green-600">
              Your password was reset. You can now login with your new password.
            </div>
          )}
        </div>

        <DialogFooter>
          {step == "email" && (
            <>
              <Button
                className="ms-auto "
                disabled={isLoading}
                onClick={() => {
                  handleSendResetcode();
                }}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin" /> Sending . .
                  </>
                ) : (
                  "Send code"
                )}
              </Button>

              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                  setEmail("");
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </>
          )}

          {step == "code" && (
            <>
              <Button
                className="ms-auto "
                disabled={isLoading}
                onClick={() => {
                  verifyResetcode();
                }}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin" /> Verifying . .
                  </>
                ) : (
                  "Verify code"
                )}
              </Button>
              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                  cancelProcess();
                }}
              >
                Cancel
              </Button>
            </>
          )}

          {step == "newPassword" && (
            <>
              <Button
                className="ms-auto "
                disabled={isLoading}
                onClick={() => {
                  resetPassword();
                }}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin" /> Changing . .
                  </>
                ) : (
                  "Change password"
                )}
              </Button>

              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                  cancelProcess();
                }}
              >
                Cancel
              </Button>
            </>
          )}

          {step === "done" && (
            <Button onClick={() => setOpen(false)}>Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
