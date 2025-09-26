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
import { useSession } from "next-auth/react";
import { Label } from "../ui/label";
import { addNewAddress } from "@/services/address.services";
import toast from "react-hot-toast";

export default function AddAddressComponent({
  fetchAllAddresses,
}: {
  fetchAllAddresses: () => void;
}) {
  // dialog states
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  // dialog status
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  //   dialog messages state
  const [error, setError] = useState("");

  // logged user data
  const x = useSession();

  // Function to validate phone number
  function validatePhone() {
    setError("");
    if (!phone || !/^01[0-25][0-9]{8}$/.test(phone)) {
      setError("Please enter valid phone number");
      return;
    }
  }

  // cancel the process function
  function cancelProcess() {
    setError("");
    setOpen(false);
    setName("");
    setCity("");
    setDetails("");
    setPhone("");
  }

  // add address
  async function addAddress() {
    setIsLoading(true);
    const values = {
      name,
      details,
      phone,
      city,
    };
    const response = await addNewAddress(x.data?.token ?? "", values);
    if (response.status == "success") {
      toast.success(response.message ? response.message : "Added successfully");
      cancelProcess();
      fetchAllAddresses();
    } else {
      setError(response.message ? response.message : "Something goes wrong");
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger
        className="bg-black px-3 py-1 text-white hover:cursor-pointer hover:bg-black/80 rounded "
        onClick={() => {
          setOpen(true);
        }}
      >
        Add new
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle> New shopping address</DialogTitle>
          <DialogDescription>
            Please enter your spesific shipping address for best experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Error area */}
          {error && (
            <div className=" bg-red-100 p-2 rounded-lg border text-center">
              <p className="text-red-500 font-semibold ">{error}</p>
            </div>
          )}
          {/* Input fields */}

          {/* Street name */}
          <div className="grid w-full  items-center gap-2">
            <Label htmlFor="addressStreet">Address owner name</Label>
            <Input
              id="addressStreet"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          {/* Address details */}
          <div className="grid w-full  items-center gap-2">
            <Label htmlFor="addressDetails">Details</Label>
            <Input
              id="addressDetails"
              type="text"
              placeholder="Enter details"
              value={details}
              onChange={(e) => {
                setDetails(e.target.value);
              }}
            />
          </div>

          {/* Address phone */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="addressPhone">Phone</Label>
            <Input
              id="addressPhone"
              type="text"
              placeholder="Enter your Phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              onBlur={() => {
                validatePhone();
              }}
            />
          </div>
          {/* Address City */}
          <div className="grid w-full  items-center gap-2">
            <Label htmlFor="addressCity">City</Label>
            <Input
              id="addressCity"
              type="text"
              placeholder="Enter your City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>

          <Button
            className="w-full"
            disabled={isLoading || !name || !city || !details}
            onClick={() => {
              addAddress();
            }}
          >
            {isLoading && <Loader className="animate-spin" />}
            Add
          </Button>
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
