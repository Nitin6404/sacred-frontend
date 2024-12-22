"use client";

import { Dispatch, SetStateAction, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useUpdateOfferMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { useRouter } from "next/navigation";
import { FormImageUploader } from "@/components/ui/imageUploader";
import { useVendorSearchStore } from "@/app/context/vendor-search-context";

const formSchema = z.object({
  description: z.string().min(1, "Please enter a valid description"),
  details: z.string().min(1, "Please enter a valid description"),
  // take string input and invalidate if its number format is less than 1
  price: z.string().refine((val) => parseInt(val) > 0, { message: "Please enter a valid price" }),
  image: z.string().url().min(1, "Please upload an image")
});

interface ServiceTypeUpdateModalProps {
  id: number;
  open: boolean;
  offerObj: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ServiceTypeUpdateModal = (props: ServiceTypeUpdateModalProps) => {
  const { vendor, setVendor } = useUserStore();
  const { data: searchData, setData, count } = useVendorSearchStore();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: props.offerObj.price,
      image: props.offerObj.image,
      details: props.offerObj.details,
      description: props.offerObj.description
    }
  });

  const { mutateAsync: updateAsync, isPending, isError } = useUpdateOfferMutation();

  const onSubmit = useCallback(
    async (formData: z.infer<typeof formSchema>) => {
      if (!vendor?.tokens.accessToken) {
        throw new Error("No access token found");
      }
      try {
        const data = await updateAsync({
          accessToken: vendor.tokens.accessToken,
          data: { id: props.id, ...formData }
        });

        setData(
          searchData.map((item) => (item.id === props.id ? data.data[1][0] : item)),
          count
        );

        props.setOpen(false);
      } catch (err: any) {
        const desc: string = err.message || err.error || "Error updating service package";
        if (desc.includes("token expired") || desc === "No access token found") {
          setVendor(null);
          router.push;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogTrigger
        title="Update"
        onClick={() => props.setOpen(true)}
        className="flex h-fit items-center justify-center rounded-full bg-primary p-2 text-white shadow-xl"
      >
        <Edit className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new service type</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-muted-foreground">Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      value={field.value}
                      placeholder="Enter the price of the service package"
                      onChange={(e) => form.setValue("price", e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <FormImageUploader
                      defaultValue={field.value}
                      setFormValue={(value) => form.setValue("image", value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-muted-foreground">Details</FormLabel>
                  <Textarea
                    {...field}
                    value={field.value}
                    // className="input"
                    placeholder="Enter details about the service package offered"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-muted-foreground">Description</FormLabel>
                  <Textarea
                    {...field}
                    value={field.value}
                    // className="input"
                    placeholder="Give description of the service package offered"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="font-semibold shadow-lg">
              {isPending && !isError && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceTypeUpdateModal;
