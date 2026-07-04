import { type MouseEventHandler, type MutableRefObject } from "react";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import type { Product } from "../../../types/Response";
import Arrow from "../../../assets/arrow.svg";

interface ArrowProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface ItemGalleryProps {
  product: Product;
  currentSlide: number;
  sliderRef: MutableRefObject<any>;
  handleThumbnailClick: (index: number) => void;
  sliderSettings: Settings;
}

function PrevArrow(props: ArrowProps) {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} !left-2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md before:hidden`}
      onClick={onClick}
    >
      <img src={Arrow} alt="Назад" className="w-5 h-5" />
    </button>
  );
}

function NextArrow(props: ArrowProps) {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} !right-2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md before:hidden`}
      onClick={onClick}
    >
      <img src={Arrow} alt="Вперед" className="w-5 h-5 rotate-180" />
    </button>
  );
}

export default function ItemGallery({
  product,
  currentSlide,
  sliderRef,
  handleThumbnailClick,
  sliderSettings,
}: ItemGalleryProps) {
  const SliderComponent = (Slider as any).default
    ? (Slider as any).default
    : Slider;

  return (
    <>
      <div className="w-full relative bg-transparent rounded-xl px-1">
        <SliderComponent
          ref={sliderRef}
          {...sliderSettings}
          className="w-full"
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          {product.images.map((imgUrl, idx) => (
            <div
              key={`${product.id}-main-${idx}`}
              className="w-full focus:outline-none"
            >
              <img
                src={imgUrl}
                alt={product.title}
                className="object-cover w-full aspect-square rounded-2xl shadow-sm"
              />
            </div>
          ))}
        </SliderComponent>
      </div>

      {product.images.length > 1 && (
        <div className="flex gap-2 px-1 overflow-x-auto md:overflow-visible md:flex-wrap">
          {product.images.map((imgUrl, idx) => (
            <button
              key={`${product.id}-thumb-${idx}`}
              onClick={() => handleThumbnailClick(idx)}
              className={`w-20 h-20 md:w-14 md:h-14 rounded-lg p-0.5 border-2 transition-all overflow-hidden bg-white flex items-center justify-center ${
                currentSlide === idx
                  ? "border-[#00A833]"
                  : "border-transparent opacity-70"
              }`}
            >
              <img
                src={imgUrl}
                alt="міні"
                className="object-contain max-h-full max-w-full"
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
