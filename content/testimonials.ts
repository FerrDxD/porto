import { Testimonial } from "@/types";
import rizkyData from "./data/testimonials/muhammad-rizky.json";
import dindaData from "./data/testimonials/dinda-salsabila.json";
import satriaData from "./data/testimonials/satria-pratama.json";

export const testimonials: Testimonial[] = [
  { id: 1, ...rizkyData },
  { id: 2, ...dindaData },
  { id: 3, ...satriaData },
] as unknown as Testimonial[];
