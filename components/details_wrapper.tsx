import { getSystemDetails } from "@/actions/details";
import Details from "./details";

export default async function DetailsWrapper() {
	
  const initialDetails = await getSystemDetails();

  return (
		<Details initialDetails={initialDetails} />
  );
}