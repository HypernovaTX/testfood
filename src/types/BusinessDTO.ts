export type YelpPriceRanges = "$" | "$$" | "$$$" | "$$$$";
export type Category = {
  alias: string;
  title: string;
};
export type Business = {
  categories: Category[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  display_phone: string;
  distance: number;
  id: string;
  alias: string;
  image_url: string;
  is_closed: boolean;
  location: {
    address1: string;
    address2: string;
    address3: string;
    city: string;
    country: string;
    display_address: string[];
    state: string;
    zip_code: string;
  };
  name: string;
  phone: string;
  price: YelpPriceRanges;
  rating: number;
  review_count: number;
  url: string;
  transactions: ("pickup" | "delivery" | "restaurant_reservation")[];
};
