import type { Product } from "../../../types/Response";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  filteredProducts: Product[];
}

export default function ProductGrid({ filteredProducts }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))
      ) : (
        <div className="col-span-full text-center py-12 text-gray-500">
          не знайдено товарів за вашим запитом
        </div>
      )}
    </div>
  );
}
