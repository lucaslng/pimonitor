import { getSystemDetails } from "@/actions/details";
import Details from "./details";

export const dynamic = "force_dynamic";

export default async function DetailsWrapper() {
	// await new Promise(r => setTimeout(r, 3000));

  return (
		<Details initialDetails={await getSystemDetails()} />
  );
}