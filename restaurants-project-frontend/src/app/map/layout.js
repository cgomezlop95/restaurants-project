import DropdownMenu from "../components/DropdownMenu";

export default function MapLayout({ children }) {
  return (
    <section>
      <div className="relative">
        <div className="absolute top-0 right-0 mr-4 mt-4">
          <DropdownMenu />
        </div>
      </div>

      {children}
    </section>
  );
}
