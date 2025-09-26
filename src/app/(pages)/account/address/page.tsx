"use client";
import AddAddressComponent from "@/components/AddAddressComponent/AddAddressComponent";
import LoaderComponent from "@/components/Shared/LoaderComponent/LoaderComponent";
import { Button } from "@/components/ui/button";
import { IAddress } from "@/interfaces";
import { getAllAddresses, removeAddress } from "@/services/address.services";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Address() {
  const [addressesArr, setAddressesArr] = useState<IAddress[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data, status } = useSession();

  // Function to get looged user addresses
  async function fetchAllAddresses() {
    setIsLoading(true);
    const response = await getAllAddresses(data?.token ?? "");
    if (response.status == "success") {
      setAddressesArr(response.data);
      console.log("fetched");
    } else {
      toast.error(
        response.message
          ? response.message
          : "Erroor while getting your addresses"
      );
      console.log("errrror");
    }
    setIsLoading(false);
  }

  // Function to delete
  async function handleRemoveAddress(addressId: string) {
    setIsLoading(true);
    const response = await removeAddress(addressId, data?.token ?? "");
    if (response.status == "success") {
      toast.success(
        response.message ? response.message : "Deleted successfully!"
      );
      setAddressesArr(response.data);
    } else {
      toast.error(
        response.message
          ? response.message
          : "Erroor while getting your addresses"
      );
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (status !== "authenticated") return;
    fetchAllAddresses();
  }, [status]);

  return (
    <>
      <div className=" bg-gray-100 p-6 rounded-lg">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Addresses</h1>
          <AddAddressComponent fetchAllAddresses={fetchAllAddresses} />
        </div>

        {/* Address Cards */}
        {isLoading ? (
          <LoaderComponent />
        ) : addressesArr.length == 0 ? (
          <p className="text-center text-gray-700">
            There is no addresses assigned yet
          </p>
        ) : (
          <div className="grid gap-4  lg:grid-cols-2">
            {addressesArr.map((address) => (
              <div
                key={address._id}
                className="flex justify-between items-start bg-white p-4 rounded-xl shadow border border-gray-200"
              >
                <div>
                  <h2 className="font-semibold text-gray-800 mb-2">
                    {address.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {" "}
                    <span className="font-bold">Address : </span>{" "}
                    {address.details}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold">Phone : </span> {address.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    {" "}
                    <span className="font-bold">City : </span> {address.city}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    handleRemoveAddress(address._id);
                  }}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
