import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getMemberById } from "../../api/api";

export const Route = createFileRoute("/members/$memberId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      memberId: params.memberId,
    };
  },
});

function RouteComponent() {
  const { memberId } = Route.useLoaderData();
  const { data, isPending } = useQuery({
    queryKey: ["memberSummary"],
    queryFn: () => getMemberById(memberId),
  });
  return (
    <>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex">
            <p className="font-bold">Name:</p>
            <p className="ml-2">{data.member.name}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Email:</p>
            <p className="ml-2">{data.member.email}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Last Check-in:</p>
            <p className="ml-2">{data.lastCheckIn ?? "--"}</p>
          </div>
          <div className="flex">
            <p className="font-bold">Check-in Count in the Last 30 Days:</p>
            <p className="ml-2">{data.last30Days}</p>
          </div>
        </>
      )}
    </>
  );
}
