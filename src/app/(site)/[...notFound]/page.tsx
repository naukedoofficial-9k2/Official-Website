import { notFound } from "next/navigation";

// With two root layouts there is no global 404, so unknown URLs land here
// and render the site's not-found page inside the site layout.
export default function CatchAllNotFound() {
  notFound();
}
