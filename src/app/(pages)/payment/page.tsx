"use client";
import { Button } from "@/components/ui/button";
import { CashPayment, IAddress, ShippingAddress } from "@/interfaces";
import { useRouter } from "next/navigation";
import { HandCoins, Loader } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { getAllAddresses } from "@/services/address.services";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  makeCashOrder,
  makeOnlinePaymentOrder,
} from "@/services/orders.services";
import { CartContext } from "@/Contexts/CartContext";

export default function Payment() {
  const [isLoading, setIsLoading] = useState(false);
  const [addressesArr, setAddressesArr] = useState<IAddress[] | []>([]);

  // states
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedaddress, setSelectedaddress] = useState<ShippingAddress>({
    details: "",
    phone: "",
    city: "",
  });

  const { data, status } = useSession();
  const { cartId } = useContext(CartContext);
  const router = useRouter();
  const { setCartCounter } = useContext(CartContext);

  // Function to get looged user addresses
  async function fetchAllAddresses() {
    setIsLoading(true);
    const response = await getAllAddresses(data?.token ?? "");
    if (response.status == "success") {
      setAddressesArr(response.data);
    } else {
      toast.error(
        "Something goes wrong while fetching your address.. please try again "
      );
    }
    setIsLoading(false);
  }

  // Function to handle selected address
  function handleSelectedAddress(value: string) {
    const address = JSON.parse(value);
    console.log(address);
    setSelectedaddress(address);
  }

  // Function to handle proceed to checkout
  async function handleProceedToCheckout() {
    setIsLoading(true);
    if (paymentMethod == "cash") {
      const response = await makeCashOrder(
        {
          details: selectedaddress.details,
          phone: selectedaddress.phone,
          city: selectedaddress.city,
        },
        cartId,
        data?.token ?? ""
      );
      if (response.status == "success") {
        toast.success("Order created successfully");
        setCartCounter(0);
        // setCashOrderDetails(response);
        router.push("/allorders/" + `${response.data._id}`);
      } else {
        toast.error("Something goes wrong");
      }
    } else {
      const response = await makeOnlinePaymentOrder(
        {
          details: selectedaddress.details,
          phone: selectedaddress.phone,
          city: selectedaddress.city,
        },
        cartId,
        data?.token ?? ""
      );
      if (response.status == "success") {
        window.location.href = `${response.session.url}`;
      } else {
        console.log("error in online way");
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (status !== "authenticated") return;
    fetchAllAddresses();
  }, [status]);

  return (
    <>
      <div className=" my-5 w-[90%] lg:w-[50%] mx-auto rounded-md shadow-lg p-5  backdrop-blur-xl border  space-y-5 ">
        <h2 className="text-2xl font-semibold text-center text-gray-600 mb-5">
          Adress & Payment Method
        </h2>

        {/* payment method field */}
        <div className=" flex flex-col gap-3">
          <Label>Payment Method</Label>
          <RadioGroup
            defaultValue="cash"
            className="flex gap-5"
            value={paymentMethod}
            onValueChange={setPaymentMethod}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="option-one">Cash</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="option-one">Online</Label>
            </div>
          </RadioGroup>
        </div>

        {/*  Address field */}
        {addressesArr.length != 0 ? (
          <div className=" flex flex-col gap-1">
            <div className="space-y-2">
              <Label>Address</Label>
              {/* Address list  */}
              <div className="flex w-full md:w-full rounded-md border border-gray-200 bg-white  ">
                <Select
                  onValueChange={handleSelectedAddress}
                  defaultValue={JSON.stringify(addressesArr[0])}
                >
                  <SelectTrigger className="w-full rounded-r-none">
                    <SelectValue placeholder="Choose Address" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {addressesArr.map((address) => {
                        return (
                          <SelectItem
                            key={address._id}
                            value={JSON.stringify(address)}
                            className=" hover:cursor-pointer  text-primary"
                          >
                            {address.details}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Link
              href={"/account/address"}
              className="hover:text-blue-500 underline self-end "
            >
              Add new
            </Link>
          </div>
        ) : (
          <Link href={"/account/address"} className="hover:underline">
            Add address
          </Link>
        )}
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 w-full"
          disabled={isLoading}
          onClick={() => {
            handleProceedToCheckout();
          }}
        >
          {isLoading ? <Loader className="animate-spin" /> : <HandCoins />}
          Proceed to checkout
        </Button>
      </div>
    </>
  );
}
