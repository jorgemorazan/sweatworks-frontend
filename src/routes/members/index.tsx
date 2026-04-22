import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getMembers } from "../../api/api";
import type { Member } from "../../types";
import { Modal } from "../../components/modal";
import { CreateMemberForm } from "../../components/createMemberForm";

export const Route = createFileRoute("/members/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [filter, setFilter] = useState("name");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState({});

  const [open, setOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["members", search],
    queryFn: () => getMembers(search),
  });

  return (
    <>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex">
            <select
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option key={"members-name"} value="name">
                Name
              </option>
              <option key={"members-email"} value="email">
                Email
              </option>
            </select>
            <input
              className="flex-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder={
                filter === "name" ? "Enter name..." : "Enter Email..."
              }
            />
            <button
              className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setSearch({ filter, input })}
            >
              Search
            </button>
            <button
              className="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => {
                setSearch({});
                setFilter("name");
                setInput("");
              }}
            >
              Clear Filter
            </button>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            + Create Member
          </button>
          <div className="p-4">
            <div className="grid grid-cols-2 bg-gray-100 font-semibold text-sm text-gray-700 p-3 rounded-t">
              <div>Name</div>
              <div>Email</div>
            </div>
            <div className="divide-y">
              {data?.map((member: Member) => (
                <Link
                  key={member.id}
                  to="/members/$memberId"
                  params={{ memberId: member.id }}
                >
                  <div className="grid grid-cols-2 p-3 hover:bg-gray-50 transition">
                    <div className="text-gray-800">{member.name}</div>
                    <div className="text-gray-600">{member.email}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            title="Create Member"
          >
            <CreateMemberForm onClose={() => setOpen(false)} />
          </Modal>
        </>
      )}
    </>
  );
}
