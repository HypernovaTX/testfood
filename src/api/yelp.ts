import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer oGRBbJXjTtEkIOFiODJ9YDiYyLP07bSFJrfYBrpeczHhCkG5SBsA0KZV8KJfLmZoKh3JS4KFZRY2bo8Aswpc3SphVsOgWFCkLPeOVqxI_EScWptHhUjzBFIcOFFYY3Yx",
  },
});
