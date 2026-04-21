import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/members" className="[&.active]:font-bold">
          Members
        </Link>
        <Link to="/plans" className="[&.active]:font-bold">
          Plans & Membership
        </Link>
        <Link to="/checkIns" className="[&.active]:font-bold">
          Check-ins
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
