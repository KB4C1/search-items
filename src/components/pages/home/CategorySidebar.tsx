interface CategorySidebarProps {
  categories: string[];
  chosenCategories: string[];
  toggleCategory: (categoryName: string) => void;
}

export default function CategorySidebar({
  categories,
  chosenCategories,
  toggleCategory,
}: CategorySidebarProps) {
  return (
    <aside className="hidden md:block w-64 flex-shrink-0">
      <div className="bg-white p-5 rounded-xl border border-gray-200 sticky top-4 shadow-sm">
        <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-100">
          Категорії
        </h3>
        <div className="flex flex-col gap-3 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={chosenCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 text-[#00A833] border-gray-300 rounded focus:ring-[#00A833] cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 capitalize">
                {cat.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
