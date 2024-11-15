import type { PageServerLoad } from "./$types";
import { storage } from "./storage";

export const load: PageServerLoad = async () => {
  // Initialize disk
  console.log(storage);
  return {};
};
