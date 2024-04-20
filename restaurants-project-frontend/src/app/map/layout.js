import DropdownMenu from "../components/DropdownMenu";
import { RequireAuth } from "../context/RequireAuth";

export default function MapLayout({ children }) {
  return (
    <RequireAuth>
      <section>
        <div className="relative">
          <div className="absolute top-0 right-0 mr-4 mt-4">
            <DropdownMenu />
          </div>
        </div>

        {children}
      </section>
    </RequireAuth>
  );
}
