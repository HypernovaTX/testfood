export type Address = {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  country: string;
  display_address: string[];
  state: string;
  zip_code: string;
};
export type Category = {
  alias: string;
  title: string;
};
export type Coordinates = {
  latitude: number;
  longitude: number;
};
export type Hours = {
  open: OpenHours[];
  hours_type: "REGULAR";
  is_open_now: boolean;
};
export type Messaging = {
  url: string;
  use_case_text: string;
};
export type OpenHours = {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number;
};
export type SpecialHours = {
  date: string;
  is_closed: boolean;
} & Omit<OpenHours, "day">;
export type YelpPriceRanges = "$" | "$$" | "$$$" | "$$$$";
