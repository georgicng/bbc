import { API_BASE, TOKEN } from "./config";
import { RemoteInstance } from "directus-sdk-javascript";

export const client = new RemoteInstance({
  url: API_BASE,
  version: "1.1", // optional, only need to update if different from default
  accessToken: TOKEN // optional, can be used without on public routes
});

