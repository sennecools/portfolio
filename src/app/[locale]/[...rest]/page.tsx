import { notFound } from "next/navigation";

/** Any address no page matches lands here, so it gets the 404 page in its own language and layout. */
export default function CatchAll() {
  notFound();
}
