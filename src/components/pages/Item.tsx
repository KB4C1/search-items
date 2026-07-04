import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import type { Settings } from "react-slick";
import type { Product } from "../../types/Response";
import ItemGallery from "./item/ItemGallery";

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [is_loading, setIsLoading] = useState<boolean>(true);

  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const sliderRef = useRef<any>(null);

  useEffect(() => {
    if (!id) return;
    async function getProduct() {
      try {
        setIsLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Товар не знайдено");

        const convertedData = (await response.json()) as Product;

        setProduct(convertedData);
        setIsLoading(false);
      } catch (e: any) {
        setErrMessage(e.message);
        setIsLoading(false);
      }
    }
    getProduct();
  }, [id]);

  if (is_loading)
    return (
      <div className="p-6 text-center text-gray-500">Завантаження товару..</div>
    );
  if (errMessage || !product)
    return (
      <div className="p-6 text-red-500 text-center">Помилка: {errMessage}</div>
    );

  const hasDiscount = product.discount && product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const sliderSettings: Settings = {
    dots: false,
    infinite: product.images.length > 1,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index);
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 bg-[#EAEAEA] min-h-screen text-gray-800 font-sans text-left">
      <div className="bg-[#EAEAEA] flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="md:w-2/5 w-full">
            <ItemGallery
              product={product}
              currentSlide={currentSlide}
              sliderRef={sliderRef}
              handleThumbnailClick={handleThumbnailClick}
              sliderSettings={sliderSettings}
            />
          </div>

          <div className="md:w-3/5 w-full px-2 flex flex-col gap-4 justify-start">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            <div>
              {hasDiscount && (
                <span className="text-sm text-black line-through mb-1 block">
                  ${product.price.toFixed(2)}
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <span className="text-3xl md:text-4xl font-black text-[#FF0000]">
                  ${finalPrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-base md:text-lg text-[#FF2D2D] font-medium">
                    -{product.discount!.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-row md:items-center gap-3 mt-3 w-full">
              <button className="w-full md:flex-1 bg-[#00A833] hover:bg-[#00942C] text-white font-bold py-3 px-6 rounded-xl text-center text-base transition-colors shadow-sm">
                Додати в кошик
              </button>
              <button className="w-full md:w-12 h-12 bg-[#00A833] hover:bg-[#00942C] text-white flex items-center justify-center rounded-xl transition-colors shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v18l-7-4.5L5 22V4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full px-2 flex flex-col gap-1.5">
          {product.brand && (
            <div className="text-sm text-gray-600">
              <span>Бренд: </span>
              <span className="font-medium">{product.brand}</span>
            </div>
          )}

          <div className="text-sm flex items-center gap-1 text-gray-600">
            <span>Рейтинг: {product.rating}</span>
            <span className="text-yellow-500">★</span>
          </div>

          <div className="text-xs font-semibold text-[#00A833]">
            {product.stock > 0 ? "Є в наявності" : "Немає в наявності"}
          </div>

          <div className="mt-4 space-y-1 text-sm text-gray-700">
            <div>
              <span className="text-gray-500">Категорія:</span>{" "}
              {product.category}
            </div>
            <div>
              <span className="text-gray-500">Гарантія:</span>{" "}
              {product.warranty}
            </div>
            <div>
              <span className="text-gray-500">Доставка:</span>{" "}
              {product.returnPolicy}
            </div>

            <div className="pt-1">
              <div className="text-gray-500">Розміри:</div>
              <ul className="pl-4 list-disc space-y-0.5 text-gray-800">
                <li>Ширина: {product.dimensions?.width}мм</li>
                <li>Висота: {product.dimensions?.height}мм</li>
                <li>Глибина: {product.dimensions?.depth}мм</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 text-sm leading-relaxed text-gray-800">
            <p>
              <span className="font-bold">Опис:</span> {product.description}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-300 pt-4 px-2 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-gray-900">Відгуки</h3>
            <div className="text-sm text-gray-500">
              {product.rating}/5<span className="text-yellow-500">★</span> (
              {product.reviews?.length || 0} відгуків)
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev, index) => (
                <div
                  key={index}
                  className="bg-[#D9D9D9] p-4 rounded-xl flex gap-3 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">
                    {rev.reviewerName.charAt(0)}
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {rev.reviewerName}
                      </h4>
                      <div className="text-gray-700 font-medium">
                        {rev.rating}/5<span className="text-yellow-500">★</span>
                      </div>
                    </div>
                    <div className="text-gray-500 my-0.5">
                      {new Date(rev.date).toLocaleDateString()}
                    </div>
                    <p className="text-gray-800 text-sm mt-1 font-normal">
                      {rev.comment}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic text-center py-2">
                Ще немає відгуків для цього товару.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
