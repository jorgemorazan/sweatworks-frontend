import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Modal } from "../components/modal";
import { CreateCheckInForm } from "../components/createCheckinForm";

export const Route = createFileRoute("/checkIns")({
  component: RouteComponent,
});

function RouteComponent() {
  const [openCreate, setOpenCreate] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpenCreate(true)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        + Create Check-in
      </button>
      <Modal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Create Membership"
      >
        <CreateCheckInForm onClose={() => setOpenCreate(false)} />
      </Modal>
    </>
  );
}
