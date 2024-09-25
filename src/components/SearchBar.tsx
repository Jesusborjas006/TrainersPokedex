interface SearchBarProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchInput, setSearchInput }: SearchBarProps) => {
  return (
    <div className="flex justify-center mt-10 space-x-2">
      <div className="flex flex-col sm:flex-row">
        <label htmlFor="pokemonName" className="text-white pr-2">
          Search Pokemon:
        </label>
        <input
          id="pokemonName"
          className="px-1 rounded-sm"
          type="text"
          placeholder="Enter Pokemon name..."
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>
    </div>
  );
};

export default SearchBar;
