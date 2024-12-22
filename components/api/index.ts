import * as ENDPOINTS from "./user.endpoints";
import * as SLIDER_ENDPOINTS from "./carousel.endpoints";
import * as CITY_ENDPOINTS from "./cities.endpoints";
import * as VENDOR_ENDPOINTS from "./vendor.endpoints";
import * as ADMIN_ENDPOINTS from "./admin.endpoints";
import * as FEEDBACK_ENDPOINTS from "./feedback.endpoints";
import * as FUNCTION_ENDPOINTS from "./functions.endpoints";
import * as OFFER_ENDPOINTS from "./services-offered.endpoints";
import * as BOOKING_ENDPOINTS from "./booking.endpoints";
import * as ALBUM_ENDPOINTS from "./album.endpoints";
import * as BLOG_ENDPOINTS from "./blogs.endpoints";
import * as CATEGORY_ENDPOINTS from "./category.endpoints";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { ICity } from "@/types";

const QUERY_KEYS = {
  slider: "slider",
  cities: "cities",
  vendorTypes: "vendorTypes",
  searchVendors: "searchVendors",
  vendorSubType: "vendorSubType",
  updateVendor: "updateVendor",
  profile: "profile",
  auth: "auth",
  cart: "cart",
  feedback: "feedback",
  offer: "offer",
  booking: "booking",
  function: "function",
  blogs: "blogs"
};

export const useRegisterUserMutation = () => {
  return useMutation({
    mutationFn: ENDPOINTS.registerUser,
    mutationKey: [QUERY_KEYS.auth]
  });
};

export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: ENDPOINTS.loginUser,
    mutationKey: [QUERY_KEYS.auth]
  });
};

export const useSliderMutation = () => {
  return useMutation({
    mutationFn: SLIDER_ENDPOINTS.getSlider,
    mutationKey: [QUERY_KEYS.slider]
  });
};

export const useGetAllCitiesQuery = () => {
  return useQuery<{ data: ICity[]; message: string; status: number }>({
    queryFn: CITY_ENDPOINTS.getAllCities,
    queryKey: [QUERY_KEYS.cities]
  });
};

export const useGetAllVendorTypesMutation = (): UseMutationResult<any, Error, any, unknown> => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.getAllVendorTypes,
    mutationKey: [QUERY_KEYS.vendorTypes]
  });
};

export const useRegisterVendorMutation = () => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.registerVendor,
    mutationKey: [QUERY_KEYS.auth]
  });
};

export const useLoginVendorMutation = () => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.loginVendor,
    mutationKey: [QUERY_KEYS.auth]
  });
};

export const useVendorProfileMutation = () => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.vendorProfile,
    mutationKey: [QUERY_KEYS.profile]
  });
};

export const useGetVendorAllSubTypesMutation = () => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.getAllVendorSubTypes,
    mutationKey: [QUERY_KEYS.vendorSubType]
  });
};

export const useAdminLoginMutation = () => {
  return useMutation({
    mutationFn: ADMIN_ENDPOINTS.loginAdmin,
    mutationKey: [QUERY_KEYS.auth]
  });
};

export const useVendorUpdateSubTypeMutation = () => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.vendorUpdateSubType,
    mutationKey: [QUERY_KEYS.vendorSubType]
  });
};

export const useGetAllFeedbacksMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.getAllFeedbacks,
    mutationKey: [QUERY_KEYS.feedback]
  });
};

export const useGetAllUserFeedbacksMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.getAllUserFeedbacks,
    mutationKey: [QUERY_KEYS.feedback]
  });
};

export const useGetAllVendorFeedbacksMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.getAllVendorFeedbacks,
    mutationKey: [QUERY_KEYS.feedback]
  });
};

export const useUpdateFeedbackMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.updateFeedback,
    mutationKey: [QUERY_KEYS.feedback]
  });
};

export const useRemoveFeedbackMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.removeFeedback,
    mutationKey: [QUERY_KEYS.feedback]
  });
};

export const useCreateFeedbackMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.createFeedback,
    mutationKey: [QUERY_KEYS.feedback]
  });
};

export const useCreateFunctionMutation = () => {
  return useMutation({
    mutationFn: FUNCTION_ENDPOINTS.createFunction,
    mutationKey: [QUERY_KEYS.function]
  });
};

export const useUpdateFunctionMutation = () => {
  return useMutation({
    mutationFn: FUNCTION_ENDPOINTS.updateFunction,
    mutationKey: [QUERY_KEYS.function]
  });
};

export const useRemoveFunctionMutation = () => {
  return useMutation({
    mutationFn: FUNCTION_ENDPOINTS.removeFunction,
    mutationKey: [QUERY_KEYS.function]
  });
};

export const useGetAllFunctionsMutation = () => {
  return useMutation({
    mutationFn: FUNCTION_ENDPOINTS.getAllFunctions,
    mutationKey: [QUERY_KEYS.function]
  });
};

export const useGetAllVendorFunctionsMutation = () => {
  return useMutation({
    mutationFn: FUNCTION_ENDPOINTS.getAllVendorFunctions,
    mutationKey: [QUERY_KEYS.function]
  });
};

export const useGetFunctionByIdMutation = () => {
  return useMutation({
    mutationFn: FUNCTION_ENDPOINTS.getFunctionById,
    mutationKey: [QUERY_KEYS.function]
  });
};

export const useCreateOfferMutation = () => {
  return useMutation({
    mutationFn: OFFER_ENDPOINTS.createOffer,
    mutationKey: [QUERY_KEYS.offer]
  });
};

export const useUpdateOfferMutation = () => {
  return useMutation({
    mutationFn: OFFER_ENDPOINTS.updateOffer,
    mutationKey: [QUERY_KEYS.offer]
  });
};

export const useGetAllOffersMutation = () => {
  return useMutation({
    mutationFn: OFFER_ENDPOINTS.getAllOffers,
    mutationKey: [QUERY_KEYS.offer]
  });
};

export const useGetAllOffersForVendorMutation = () => {
  return useMutation({
    mutationFn: OFFER_ENDPOINTS.getAllOffersForVendor,
    mutationKey: [QUERY_KEYS.offer]
  });
};

export const useRemoveOfferMutation = () => {
  return useMutation({
    mutationFn: OFFER_ENDPOINTS.removeOffer,
    mutationKey: [QUERY_KEYS.offer]
  });
};

export const useSearchVendorsMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.searchVendors],
    mutationFn: VENDOR_ENDPOINTS.searchVendors
  });
};

export const useUpdateVendorMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.updateVendor],
    mutationFn: VENDOR_ENDPOINTS.updateVendor
  });
};

export const useSearchByIdMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.offer],
    mutationFn: OFFER_ENDPOINTS.getOfferById
  });
};

export const useCreateBookingMutation = () => {
  return useMutation({
    mutationFn: BOOKING_ENDPOINTS.createBooking,
    mutationKey: [QUERY_KEYS.booking]
  });
};

export const useGetAllBookingsForAdminMutation = () => {
  return useMutation({
    mutationFn: BOOKING_ENDPOINTS.getAllBookingsForAdmin,
    mutationKey: [QUERY_KEYS.booking]
  });
};

export const useGetAllUserBookingsMutation = () => {
  return useMutation({
    mutationFn: BOOKING_ENDPOINTS.getAllUserBookings,
    mutationKey: [QUERY_KEYS.booking]
  });
};

export const useGetAllVendorBookingsMutation = () => {
  return useMutation({
    mutationFn: BOOKING_ENDPOINTS.getAllVendorBookings,
    mutationKey: [QUERY_KEYS.booking]
  });
};

export const useGetBookingByIdMutation = () => {
  return useMutation({
    mutationFn: BOOKING_ENDPOINTS.getBookingById,
    mutationKey: [QUERY_KEYS.booking]
  });
};

export const useUpdateBookingStatusMutation = () => {
  return useMutation({
    mutationFn: BOOKING_ENDPOINTS.updateBookingStatus,
    mutationKey: [QUERY_KEYS.booking]
  });
};

export const useCreateAlbumInBulkMutation = () => {
  return useMutation({
    mutationFn: ALBUM_ENDPOINTS.createAlbumInBulk,
    mutationKey: [QUERY_KEYS.offer]
  });
};

export const useDeleteMediaMutation = () => {
  return useMutation({
    mutationFn: ALBUM_ENDPOINTS.deleteMedia,
    mutationKey: [QUERY_KEYS.offer]
  });
};

export const useGetAlbumByVendorIdMutation = () => {
  return useMutation({
    mutationFn: ALBUM_ENDPOINTS.getAlbumByVendorId,
    mutationKey: [QUERY_KEYS.offer]
  });
};

export const useCreateBlogMutation = () => {
  return useMutation({
    mutationFn: BLOG_ENDPOINTS.createBlog,
    mutationKey: [QUERY_KEYS.blogs]
  });
};

export const useGetAllBlogsMutation = () =>
  useMutation({
    mutationFn: BLOG_ENDPOINTS.getAllBlogs,
    mutationKey: [QUERY_KEYS.blogs]
  });

export const useUpdateBlogsMutation = () =>
  useMutation({
    mutationFn: BLOG_ENDPOINTS.updateBlog,
    mutationKey: [QUERY_KEYS.blogs]
  });

export const useRemoveBlogMutation = () =>
  useMutation({
    mutationFn: BLOG_ENDPOINTS.removeBlog,
    mutationKey: [QUERY_KEYS.blogs]
  });

export const useGetBlogByIdMutation = () =>
  useMutation({
    mutationFn: BLOG_ENDPOINTS.getBlogById,
    mutationKey: [QUERY_KEYS.blogs]
  });

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationFn: CATEGORY_ENDPOINTS.createCategory,
    mutationKey: [QUERY_KEYS.offer]
  });
};

export const useUpdateCategoryMutation = () => {
  return useMutation({
    mutationFn: CATEGORY_ENDPOINTS.updateCategory,
    mutationKey: [QUERY_KEYS.offer]
  });
};

export const useRemoveCategoryMutation = () => {
  return useMutation({
    mutationFn: CATEGORY_ENDPOINTS.removeCategory,
    mutationKey: [QUERY_KEYS.offer]
  });
};

export const useGetAllCategoriesMutation = () => {
  return useMutation({
    mutationFn: CATEGORY_ENDPOINTS.getAllCategories,
    mutationKey: [QUERY_KEYS.offer]
  });
};
