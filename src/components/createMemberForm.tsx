import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createMember } from "../api/api";

export function CreateMemberForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (body: { name: string; email: string }) => createMember(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="px-3 py-2 border rounded-lg"
      />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
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
  );
}
