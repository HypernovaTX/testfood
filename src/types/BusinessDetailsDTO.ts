import {
  Address,
  Category,
  Coordinates,
  Hours,
  Messaging,
  SpecialHours,
  YelpPriceRanges,
} from "./GeneralDTO";

export type BusinessDetails = {
  categories: Category[];
  coordinates: Coordinates;
  display_phone: string;
  hours: Hours;
  id: string;
  alias: string;
  image_url: string;
  is_claimed: boolean;
  is_closed: boolean;
  location: { cross_streets: string } & Address;
  messaging?: Messaging;
  name: string;
  phone: string;
  photos: string[];
  price: YelpPriceRanges;
  rating: number;
  review_count: number;
  url: string;
  transactions: string[];
  special_hours: SpecialHours[];
};
