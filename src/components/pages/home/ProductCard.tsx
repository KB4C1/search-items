import { Link } from "react-router";
import type { Product } from "../../../types/Response";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discount && product.discount > 0;
  let finalPrice = product.price;

  if (hasDiscount) {
    finalPrice = product.price * (1 - product.discount / 100);
  }

  return (
    <Link to={`/items/${product.id}`} key={product.id}>
      <div className="bg-white border border-[#00A833] rounded-xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full">
        <div>
          <div className="w-full h-48 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden mb-3">
            <img
              className="object-contain max-h-full"
              src={product.thumbnail}
              alt={product.title}
            />
          </div>

          <div className="flex flex-col text-left gap-2">
            <h2 className="font-bold text-gray-800 line-clamp-2 min-h-[3rem]">
              {product.title}
            </h2>
            <span className="text-xs text-gray-400 uppercase font-semibold">
              {product.category}
            </span>

            <div className="flex flex-col min-h-[3.5rem] justify-end">
              {hasDiscount ? (
                <>
                  <span className="text-sm text-black line-through mb-1">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-baseline justify-between">
                    <strong className="text-[#FF0000] text-2xl font-black">
                      ${finalPrice.toFixed(2)}
                    </strong>
                    <span className="text-sm text-[#FF2D2D] font-medium">
                      -{product.discount!.toFixed(1)}%
                    </span>
                  </div>
                </>
              ) : (
                <strong className="text-gray-900 text-lg">
                  ${product.price.toFixed(2)}
                </strong>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-2 border-t border-gray-100">
          {product.stock > 0 ? (
            <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-1 rounded">
              в наявності
            </span>
          ) : (
            <span className="text-red-500 font-medium text-xs bg-red-50 px-2 py-1 rounded">
              немає в наявності
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
