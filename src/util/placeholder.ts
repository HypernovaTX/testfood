import { Business } from "../types/BusinessSearchDTO";

const placeholderBusiness: Business = {
  categories: [],
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  display_phone: "",
  distance: 0,
  id: "",
  alias: "",
  image_url: "",
  is_closed: false,
  location: {
    address1: "",
    address2: "",
    address3: "",
    city: "",
    country: "",
    display_address: [],
    state: "",
    zip_code: "",
  },
  name: "",
  phone: "",
  price: "$",
  rating: 0,
  review_count: 0,
  url: "",
  transactions: [],
};

export function placeholderBusinessArray() {
  return new Array<Business>(3)
    .fill(placeholderBusiness)
    .map((item, index) => ({ ...item, id: `placeholder_${index}` }));
}
