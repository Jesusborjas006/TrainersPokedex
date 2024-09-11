interface SearchBarProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchInput, setSearchInput }: SearchBarProps) => {
  return (
    <div className="flex justify-center mt-10 space-x-2">
      <label className="text-white">Search Pokemon:</label>
      <input
        className="border flex px-1 rounded-sm"
        type="text"
        placeholder="Enter Pokemon name..."
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
    </div>
  );
};

export default SearchBar;
