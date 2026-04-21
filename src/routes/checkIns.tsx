import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/checkIns")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/checkIns"!</div>;
}
