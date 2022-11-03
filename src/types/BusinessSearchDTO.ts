import { Address, Category, Coordinates, YelpPriceRanges } from "./GeneralDTO";

export type BusinessSearch = {
  total: number;
  businesses: Business[];
  region: {
    center: {
      latitude: number;
      longitude: number;
    };
  };
};

export type Business = {
  categories: Category[];
  coordinates: Coordinates;
  display_phone: string;
  distance: number;
  id: string;
  alias: string;
  image_url: string;
  is_closed: boolean;
  location: Address;
  name: string;
  phone: string;
  price: YelpPriceRanges;
  rating: number;
  review_count: number;
  url: string;
  transactions: ("pickup" | "delivery" | "restaurant_reservation")[];
};
