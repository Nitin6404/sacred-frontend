export const authEndpoints = {
  registerUser: "/api/v1/user/register",
  loginUser: "/api/v1/user/login",
  registerVendor: "/api/v1/vendor/register",
  loginVendor: "/api/v1/vendor/login",
  registerAdmin: "",
  loginSuperAdmin: "/api/v1/admin/login"
} as const;

export const citiesEndpoints = {
  createCity: "/api/v1/city/create",
  getAllCities: "/api/v1/city/all",
  updateCity: "/api/v1/city/update",
  removeCity: "/api/v1/city/remove"
} as const;

export const userEndpoints = {
  userProfile: "/api/v1/user/profile",
  removeUser: "/api/v1/user/remove"
} as const;

export const sliderEndpoints = {
  createCarousel: "/api/v1/sliders/add",
  getAllCarousels: "/api/v1/sliders/all",
  updateCarousel: "/api/v1/sliders/update",
  removeCarousel: "/api/v1/sliders/remove"
} as const;

export const vendorTypeEndpoints = {
  createVendorType: "/api/v1/vendor-type/add",
  getAllVendorTypes: "/api/v1/vendor-type/all",
  updateVendorType: "/api/v1/vendor-type/update",
  removeVendorType: "/api/v1/vendor-type/remove"
} as const;

export const vendorSubTypeEndpoints = {
  // createVendorSubType: (vendorTypeId: number | string) => `/api/v1/vendor-sub-type/${vendorTypeId}/add`,
  getAllVendorSubTypesById: (vendorTypeId: number) => `/api/v1/vendor-sub-type/${vendorTypeId}/all`,
  getAllVendorSubTypesBySlug: (vendorTypeSlug: string) => `/api/v1/vendor-sub-type/${vendorTypeSlug}`,
  updateVendorSubType: "/api/v1/vendor-sub-type/update",
  removeVendorSubType: "/api/v1/vendor-sub-type/remove"
} as const;

export const vendorEndpoints = {
  vendorProfile: "/api/v1/vendor/profile",
  removeVendor: "/api/v1/vendor/remove",
  vendorUpdateSubType: "/api/v1/vendor/update/sub-types",
  searchVendors: "/api/v1/search/vendors",
  updateVendor: "/api/v1/vendor/update/profile"
} as const;

export const adminEndpoints = {
  getDashboardData: "/api/v1/admin/get-dashboard"
} as const;

export const feedbackEndpoints = {
  createFeedback: "/api/v1/feedback/create",
  updateFeedback: "/api/v1/feedback/update",
  removeFeedback: "/api/v1/feedback/remove",
  getAllFeedbacks: "/api/v1/feedback/all",
  getAllUserFeedbacks: "/api/v1/feedback/user-all",
  getAllVendorFeedbacks: "/api/v1/feedback/vendor-all",
  getFeedbackById: "/api/v1/feedback"
} as const;

export const functionsEndpoints = {
  createFunction: "/api/v1/function/create",
  updateFunction: "/api/v1/function/update",
  removeFunction: "/api/v1/function/remove",
  getAllFunctions: "/api/v1/function/all",
  getAllVendorFunctions: "/api/v1/function/vendor-all",
  getFunctionById: "/api/v1/functions"
} as const;

export const offerEndpoints = {
  createOffer: "/api/v1/service-offer/create",
  updateOffer: "/api/v1/service-offer/update",
  removeOffer: "/api/v1/service-offer/remove",
  getAllOffers: "/api/v1/service-offer/all",
  getAllOffersForVendor: "/api/v1/service-offer/vendor-all"
} as const;

export const searchEndpoints = {
  search: "/api/v1/search/vendors"
} as const;

export const bookingEndpoints = {
  createBooking: "/api/v1/booking/create",
  getAllBookingsForAdmin: "/api/v1/booking/all",
  getAllUserBookings: "/api/v1/booking/user",
  getAllVendorBookings: "/api/v1/booking/vendor",
  getBookingById: "/api/v1/booking",
  updateBooking: "/api/v1/booking/update"
} as const;

export const albumEndpoints = {
  createAlbumInBulk: "/api/v1/album/create/bulk",
  deleteMedia: "/api/v1/album/remove",
  getAlbumByVendorId: "/api/v1/album"
} as const;

export const blogsEndpoints = {
  createBlog: "/api/v1/blog/create",
  updateBlog: "/api/v1/blog/update",
  removeBlog: "/api/v1/blog/remove",
  getAllBlogs: "/api/v1/blog/all",
  getBlogById: "/api/v1/blog"
};

export const categoryEndpoints = {
  createCategory: "/api/v1/category/create",
  updateCategory: "/api/v1/category/update",
  removeCategory: "/api/v1/category/remove",
  getAllCategories: "/api/v1/category/all"
} as const;

export const templateEndpoints = {
  // Template management
  list: "/api/v1/templates",
  get: "/api/v1/templates",
  create: "/api/v1/templates",
  update: "/api/v1/templates",
  delete: "/api/v1/templates",
  featured: "/api/v1/templates/featured",
  categories: "/api/v1/templates/categories",

  // Template customization
  customize: "/api/v1/templates/customization",
  preview: "/api/v1/templates/preview",
  generatePDF: "/api/v1/templates/pdf",
  publish: "/api/v1/templates/publish",
  share: "/api/v1/templates/share",

  // Template assets
  uploadImage: "/api/v1/templates/upload/image",
  uploadFont: "/api/v1/templates/upload/font",
  uploadMusic: "/api/v1/templates/upload/music"
} as const;

export const cloudinaryUrl = `cloudinary://${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`;
