"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { useVendorContext } from "@/app/context/vendor-context";
import useStateRef from "react-usestateref";
import MultipleSelectorComp from "@/app/_components/vendor-wrapper/multi-select-comp";
import { Option } from "@/components/ui/multiselect";
import { useVendorSearch } from "@/hooks/useVendorSearch";
import { Input } from "@/components/ui/input";
import { VendorSubType } from "@/types/auth.types";
import { useGetVendorAllSubTypesMutation } from "@/components/api";
import { ICity } from "@/types";

export const IMG_MAX_LIMIT = 3;

const formSchema = z.object({
  location: z.string().min(3, { message: "Please select a venue from the dropdown" }),
  city: z.string({ message: "Please select a valid city from the dropdown" }),
  services: z.number().array(),
  budget: z.number(),
  date: z.date().refine(
    (date) => {
      const currDate = new Date();
      currDate.setHours(0, 0, 0, 0);
      return date >= currDate;
    },
    { message: "Date should not be before today" }
  )
});

type ProductFormValues = z.infer<typeof formSchema>;

const locationEnum = { myvenue: "My Venue", studio: "Studio" };
const defaultValues: ProductFormValues = {
  budget: 0,
  city: "",
  date: addDays(new Date(), 1),
  location: locationEnum.myvenue,
  // @ts-ignore
  services: []
};

export const SearchForm = (props: { vendorTypeSlug: string; citySlug?: string }) => {
  const searchParams = useSearchParams();
  const { cities } = useVendorContext();
  const [arr, setArr] = useState<Option[]>([]);
  const { onFormSubmit, isPending } = useVendorSearch();
  const [selected, setSelected] = useState<Option[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCitySlug, citySlugRef] = useStateRef<string | null>(null);
  const { mutateAsync: getVendorSubTypes } = useGetVendorAllSubTypesMutation();
  const form = useForm<ProductFormValues>({ defaultValues, resolver: zodResolver(formSchema) });

  useEffect(() => {
    getVendorSubTypes(props.vendorTypeSlug).then((data) => {
      setArr(data.data.map((item: VendorSubType) => ({ label: item.subType, value: item.id?.toString() })) || []);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.vendorTypeSlug]);

  useEffect(() => {
    form.setValue("services", selected.map((item) => parseInt(item.value)) as [number, ...number[]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (!cities || cities.length === 0) return;

    if (!props.citySlug) return;
    const id = cities.find((city: ICity) => city.slug === props.citySlug)?.id;
    if (id) {
      setCitySlug(props.citySlug);
      form.setValue("city", props.citySlug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  const onSubmit = async () => {
    const formValues = form.getValues();
    onFormSubmit({
      rating: 5,
      date: formValues.date,
      city: formValues.city,
      vendorType: props.vendorTypeSlug,
      priceRange: [0, formValues.budget],
      serviceIds: selected.map((item) => Number(item.value))
    });
  };

  const onCityValueChange = (citySlug: string) => {
    form.setValue("city", citySlug);
    setCitySlug(citySlug);

    const params = new URLSearchParams(searchParams.toString());
    params.set("city", citySlug);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="city"
            control={form.control}
            render={() => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select onValueChange={onCityValueChange}>
                    <SelectTrigger>
                      <SelectValue>
                        {cities.find((city) => city.slug === citySlugRef.current)?.name || "Select a city"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem value={`${city.slug}`} key={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {arr.length > 0 ? (
            <FormField
              control={form.control}
              name="services"
              render={() => (
                <FormItem>
                  <FormLabel>Select services</FormLabel>
                  <MultipleSelectorComp arr={selected || []} setArr={setSelected} defaultOptions={arr} />
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

          <div className="grid-cols-1 gap-8 md:grid lg:grid-cols-2">
            <FormField
              control={form.control}
              name="budget"
              render={() => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      defaultValue={defaultValues.budget}
                      onChange={(e) => form.setValue("budget", parseInt(e.target.value, 10))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick a date for the event:</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("w-full", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full items-center justify-end">
            <Button disabled={isPending} className="ml-auto px-10 font-semibold shadow-lg" type="submit">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
