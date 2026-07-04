import Button from "./Button";

interface FiltersModalProps {
  filters: string[];
  selectedFilters: string[];
  onToggleCategory: (category: string) => void;
  onClose: () => void;
}

export default function FiltersModal({
  filters,
  selectedFilters,
  onToggleCategory,
  onClose,
}: FiltersModalProps) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl w-full p-6 max-w-md shadow-2xl animate-[pulse-slow_0.2s_ease-out]">
      <div className="flex flex-row justify-between items-center border-b border-b-[#a7a7a7] pb-3 mb-4">
        <h2 className="text-xl font-bold">Вибрати фільтри</h2>
        <Button text="Закрити" onclick={onClose} />
      </div>

      <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2">
        {filters.map((filter, index) => {
          const isChecked = selectedFilters.includes(filter);
          return (
            <div
              key={index}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => onToggleCategory(filter)}
            >
              <input
                type="checkbox"
                id={`filter-${index}`}
                checked={isChecked}
                onChange={() => {}}
                className="w-4 h-4 text-[#00A833] rounded focus:ring-[#00A833] cursor-pointer"
              />
              <label
                htmlFor={`filter-${index}`}
                className="cursor-pointer text-gray-700 select-none capitalize"
              >
                {filter.replace("-", " ")}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
