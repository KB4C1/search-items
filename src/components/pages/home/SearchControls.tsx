import type { Dispatch, SetStateAction } from "react";
import Button from "../../Button";

type SortOption = "rating" | "pricehtl" | "pricelth";

interface SearchControlsProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  chosenCategories: string[];
  setOpenModal: (value: boolean) => void;
  sortType: SortOption;
  setSortType: (value: SortOption) => void;
}

export default function SearchControls({
  search,
  setSearch,
  chosenCategories,
  setOpenModal,
  sortType,
  setSortType,
}: SearchControlsProps) {
  return (
    <section className="flex flex-col gap-4 mb-6">
      <div className="w-full">
        <input
          type="text"
          placeholder="пошук товарів.."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A833] shadow-sm"
        />
      </div>

      <div className="flex flex-row justify-between items-center gap-4">
        <div className="md:hidden">
          <Button
            text={`фільтри (${chosenCategories.length})`}
            onclick={() => setOpenModal(true)}
          />
        </div>
        <div className="hidden md:block"></div>

        <div className="flex flex-row gap-2 items-center">
          <label
            htmlFor="sortBy"
            className="text-sm font-medium text-gray-700 whitespace-nowrap"
          >
            сортування:
          </label>
          <select
            name="sortBy"
            id="sortBy"
            value={sortType}
            onChange={(evt) => setSortType(evt.target.value as SortOption)}
            className="p-2 border border-gray-300 rounded-xl bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00A833] shadow-sm"
          >
            <option value="rating">за рейтингом</option>
            <option value="pricelth">починаючи з дешевших</option>
            <option value="pricehtl">починаючи з дорожчих</option>
          </select>
        </div>
      </div>
    </section>
  );
}
