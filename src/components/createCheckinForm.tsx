import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createCheckIn, getActiveMembers } from "../api/api";

export function CreateCheckInForm({ onClose }: { onClose: () => void }) {
  const activeMembers = useQuery({
    queryKey: ["activeMembers"],
    queryFn: () => getActiveMembers(),
  });

  const [selectActiveMember, setSelectActiveMember] = useState("");

  useEffect(() => {
    if (activeMembers.data?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectActiveMember(activeMembers.data[0].id);
    }
  }, [activeMembers.data]);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => createCheckIn(id),
    onSuccess: () => {
      alert("Check-in created!");
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(selectActiveMember);
  };

  return (
    <>
      {activeMembers.isPending ? (
        <p>Loading....</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectActiveMember}
            onChange={(e) => setSelectActiveMember(e.target.value)}
          >
            {activeMembers.data?.map((activeMember) => (
              <option key={activeMember.id} value={activeMember.id}>
                {activeMember.name} - {activeMember.email}
              </option>
            ))}
          </select>

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
