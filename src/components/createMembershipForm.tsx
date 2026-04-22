import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createMembership, getInactiveMembers, getPlans } from "../api/api";

export function CreateMembershipForm({ onClose }: { onClose: () => void }) {
  const inactiveMembers = useQuery({
    queryKey: ["inactiveMembers"],
    queryFn: () => getInactiveMembers(),
  });

  const plans = useQuery({
    queryKey: ["plans"],
    queryFn: () => getPlans(),
  });

  const [selectInactiveMember, setSelectInactiveMember] = useState("");
  const [selectPlan, setSelectPlan] = useState("");
  const [selectDate, setSelectDate] = useState("");

  useEffect(() => {
    if (inactiveMembers.data?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectInactiveMember(inactiveMembers.data[0].id);
    }
  }, [inactiveMembers.data]);

  useEffect(() => {
    if (plans.data?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectPlan(plans.data[0].id);
    }
  }, [plans.data]);

  const { mutate, isPending } = useMutation({
    mutationFn: (body: {
      planId: string;
      memberId: string;
      startDate: string;
    }) => createMembership(body),
    onSuccess: () => {
      alert("Membership created!");
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      planId: selectPlan,
      memberId: selectInactiveMember,
      startDate: selectDate,
    });
  };

  return (
    <>
      {inactiveMembers.isPending && plans.isPending ? (
        <p>Loading....</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectInactiveMember}
            onChange={(e) => setSelectInactiveMember(e.target.value)}
          >
            {inactiveMembers.data?.map((inactiveMember) => (
              <option key={inactiveMember.id} value={inactiveMember.id}>
                {inactiveMember.name} - {inactiveMember.email}
              </option>
            ))}
          </select>

          <select
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectPlan}
            onChange={(e) => setSelectPlan(e.target.value)}
          >
            {plans.data?.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>

          <input
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
            placeholder="Email"
            type="date"
            className="px-3 py-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </form>
      )}
    </>
  );
}
