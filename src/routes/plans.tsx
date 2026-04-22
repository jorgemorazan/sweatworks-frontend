import { createFileRoute } from "@tanstack/react-router";
import { Modal } from "../components/modal";
import { useState } from "react";
import { CreateMembershipForm } from "../components/createMembershipForm";
import { CancelMembershipForm } from "../components/cancelMembershipForm";

export const Route = createFileRoute("/plans")({
  component: RouteComponent,
});

function RouteComponent() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpenCreate(true)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        + Create Membership
      </button>
      <button
        onClick={() => setOpenCancel(true)}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        - Cancel Membership
      </button>
      <Modal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        title="Create Membership"
      >
        <CreateMembershipForm onClose={() => setOpenCreate(false)} />
      </Modal>
      <Modal
        isOpen={openCancel}
        onClose={() => setOpenCancel(false)}
        title="Cancel Membership"
      >
        <CancelMembershipForm onClose={() => setOpenCancel(false)} />
      </Modal>
    </>
  );
}
