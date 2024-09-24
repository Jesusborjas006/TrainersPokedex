const SelectGeneration = ({ pokemonQuery, setPokemonQuery }) => {
  return (
    <div className="flex flex-col gap-y-4 sm:flex-row justify-between items-center max-w-[1200px] mx-auto pt-10 px-4 sm:px-6 md:px-10">
      <h2 className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        {pokemonQuery.region} Region
      </h2>
      <select
        className="p-1 rounded-sm"
        value={`${pokemonQuery.startId}-${pokemonQuery.limit}-${pokemonQuery.region}`}
        onChange={(e) => {
          const [startId, limit, region] = e.target.value.split("-");
          setPokemonQuery({
            startId: Number(startId),
            limit: Number(limit),
            region,
          });
        }}
      >
        <option value={"0-151-Kanto"}>Generation One</option>
        <option value={"151-100-Johto"}>Generation Two</option>
        <option value={"251-135-Hoenn"}>Generation Three</option>
        <option value={"386-107-Sinnoh"}>Generation Four</option>
        <option value={"493-156-Unova"}>Generation Five</option>
        <option value={"649-72-Kalos"}>Generation Six</option>
        <option value={"721-88-Alola"}>Generation Seven</option>
        <option value={"809-96-Galar"}>Generation Eight</option>
        <option value={"905-120-Paldea"}>Generation Nine</option>
      </select>
    </div>
  );
};

export default SelectGeneration;
