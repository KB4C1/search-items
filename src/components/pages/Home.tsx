import { useEffect, useState } from "react";
import FiltersModal from "../FilterModal";
import type { Product, DummyJsonResponse } from "../../types/Response";
import CategorySidebar from "./home/CategorySidebar";
import SearchControls from "./home/SearchControls";
import ProductGrid from "./home/ProductGrid";

type SortOption = "rating" | "pricehtl" | "pricelth";

export default function SearchPage() {
  const [data, setData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [is_loading, setIsLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string | null>(null);

  const [search, setSearch] = useState<string>("");
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [sortType, setSortType] = useState<SortOption>("rating");

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    async function getProductsFromServer() {
      try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
          throw new Error("помилка данних");
        }

        const convertedData = (await response.json()) as DummyJsonResponse;
        setData(convertedData.products);

        const uniqueCategories = Array.from(
          new Set(convertedData.products.map((item) => item.category)),
        );
        setCategories(uniqueCategories);
        setIsLoading(false);
      } catch (e: any) {
        console.log("помилка:", e);
        setErrMessage(e.message);
        setIsLoading(false);
      }
    }

    getProductsFromServer();
  }, []);

  const toggleCategory = (categoryName: string) => {
    if (chosenCategories.includes(categoryName)) {
      const filtered = chosenCategories.filter((item) => item !== categoryName);
      setChosenCategories(filtered);
    } else {
      setChosenCategories([...chosenCategories, categoryName]);
    }
  };

  const filteredProducts = data
    .filter((p) => {
      const isSearchMatch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const isCatMatch =
        chosenCategories.length === 0 || chosenCategories.includes(p.category);
      return isSearchMatch && isCatMatch;
    })
    .sort((x, y) => {
      if (sortType === "pricehtl") {
        return y.price - x.price;
      }
      if (sortType === "pricelth") {
        return x.price - y.price;
      }
      return y.rating - x.rating;
    });

  if (is_loading) {
    return <div className="p-6 text-center">завантаження..</div>;
  }
  if (errMessage) {
    return (
      <div className="p-6 text-red-500 text-center">помилка: {errMessage}</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 w-full relative">
      <div className="flex flex-col md:flex-row gap-6">
        <CategorySidebar
          categories={categories}
          chosenCategories={chosenCategories}
          toggleCategory={toggleCategory}
        />

        <div className="flex-1 w-full flex flex-col">
          <SearchControls
            search={search}
            setSearch={setSearch}
            chosenCategories={chosenCategories}
            setOpenModal={setOpenModal}
            sortType={sortType}
            setSortType={setSortType}
          />

          <ProductGrid filteredProducts={filteredProducts} />
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <FiltersModal
            filters={categories}
            selectedFilters={chosenCategories}
            onToggleCategory={toggleCategory}
            onClose={() => setOpenModal(false)}
          />
        </div>
      )}
    </div>
  );
}
