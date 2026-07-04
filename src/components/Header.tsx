import { Link } from "react-router";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-gray-800">
          Items Search
        </Link>
        <span className="text-sm text-gray-500">Каталог товарів</span>
      </div>
    </header>
  );
}
