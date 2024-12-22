import z from "zod";
import { UserAuthType } from "@/types";
import { authEndpoints } from "@/lib/apiConfig/endpoints";

export const loginFormSchema = z.object({
  phone: z.string().length(10, {
    message: "Phone number must have 10 digits"
  }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
});

export type LoginFormDataType = z.infer<typeof loginFormSchema>;
export const loginFormDefaultValues: Partial<LoginFormDataType> = { phone: "", password: "" };
export const loginConfig: Record<UserAuthType, { endpoint: string; defaultRedirect: string }> = {
  user: { endpoint: authEndpoints.loginUser, defaultRedirect: "/" },
  vendor: { endpoint: authEndpoints.loginVendor, defaultRedirect: "/vendor" },
  super_admin: { endpoint: authEndpoints.loginSuperAdmin, defaultRedirect: "/admin/dashboard" }
};

export const registerUserFormSchema = loginFormSchema.extend({
  name: z.string().min(0, { message: "Enter a valid name" })
});
export type RegisterUserBodyType = z.infer<typeof registerUserFormSchema>;
export const registerUserDefaultValues: Partial<RegisterUserBodyType> = {
  password: "",
  phone: "",
  name: "Demo User"
};

export const registerVendorFormSchema = registerUserFormSchema.extend({
  email: z.string().email({ message: "Enter a valid email address" }),
  cityId: z.number().min(1, { message: "Please select a city from the given list" }),
  vendorTypeId: z.number().min(1, { message: "Please select a service from the given list" })
});
export type RegisterVendorBodyType = z.infer<typeof registerVendorFormSchema>;
export const registerVendorDefaultValues: Partial<RegisterVendorBodyType> = { ...registerUserDefaultValues };

export const useNavigateToNextScreenAfterSuccess = () => {};
