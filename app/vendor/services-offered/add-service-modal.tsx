"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useUserStore } from "@/app/context/user-context";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { VendorSubType } from "@/types/auth.types";
import { useCreateOfferMutation } from "@/components/api";
import { Input } from "@/components/ui/input";
import { FormImageUploader } from "@/components/ui/imageUploader";
import { useVendorSearchStore } from "@/app/context/vendor-search-context";

const formSchema = z.object({
  serviceOfferedId: z.number().min(1, "Please select a service type"),
  price: z.number().min(1, "Please enter a valid price"),
  description: z.string().min(1, "Please enter a valid description"),
  details: z.string().min(1, "Please enter a valid description"),
  image: z.string().url().min(1, "Please upload an image")
});

export function AddServiceModal() {
  const { vendor } = useUserStore();
  const { setData, data: searchData } = useVendorSearchStore();

  const [open, setOpen] = useState(false);

  const { mutate: submitFn, isPending: submitPending } = useCreateOfferMutation();

  type formType = z.infer<typeof formSchema>;
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: { details: "", description: "", serviceOfferedId: 0 }
  });

  function onSubmit(formData: formType) {
    try {
      submitFn(
        { accessToken: vendor?.tokens?.accessToken || "", data: formData },
        {
          onSuccess: (data) => {
            setData([...searchData, data.data], searchData.length + 1);
            toast({ variant: "default", description: "Data submitted successfully" });
            setOpen(false);
          },
          onError: (err) => {
            throw err;
          }
        }
      );
    } catch (err: any) {
      toast({ variant: "destructive", description: err.error || err.message || "Error submitting data" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-auto font-semibold shadow-lg">
          <span className="flex items-center justify-center gap-2">
            <Plus size={16} />
            Add service package
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new service package to be offered</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="serviceOfferedId"
              render={() => (
                <FormItem>
                  <FormLabel>Service Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        form.setValue(
                          "serviceOfferedId",
                          ((vendor?.SelectedVendorSubTypes as VendorSubType[]) || []).find(
                            (item) => item.vendorSubTypeId === parseInt(value)
                          )?.vendorSubTypeId || 0
                        );
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {vendor?.SelectedVendorSubTypes?.length ?? 0 > 0 ? (
                          vendor?.SelectedVendorSubTypes.map((selectedVendorType) => (
                            <SelectItem
                              value={`${selectedVendorType.vendorSubTypeId}`}
                              key={selectedVendorType.vendorSubTypeId}
                            >
                              {selectedVendorType.subType}
                            </SelectItem>
                          ))
                        ) : (
                          <div>loading...</div>
                        )}
                      </SelectContent>
                    </Select>
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
                    <FormImageUploader setFormValue={(value) => form.setValue("image", value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the price of the service package"
                      disabled={submitPending}
                      onChange={(e) => form.setValue("price", parseInt(e.target.value))}
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
                  <FormLabel>Details</FormLabel>
                  <Textarea {...field} placeholder="Enter details about the service package offered" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} placeholder="Give description of the service package offered" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={submitPending} className="font-semibold shadow-lg">
              {submitPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
