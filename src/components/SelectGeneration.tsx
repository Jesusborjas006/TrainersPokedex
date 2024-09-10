const SelectGeneration = ({ pokemonQuery, setPokemonQuery }) => {
  return (
    <div className="flex justify-end border border-red-300 max-w-[1200px] mx-auto pt-10">
      <select
        className="w-[200px] p-1 rounded-sm"
        value={`${pokemonQuery.startId}-${pokemonQuery.limit}`}
        onChange={(e) => {
          const [startId, limit] = e.target.value.split("-");
          console.log(startId, limit);
          setPokemonQuery({
            startId: Number(startId),
            limit: Number(limit),
          });
        }}
      >
        <option value={"0-151"}>Generation One</option>
        <option value={"151-100"}>Generation two</option>
        <option value={"251-135"}>Generation Three</option>
        <option value={"386-107"}>Generation Four</option>
        <option value={"493-156"}>Generation Five</option>
        <option value={"649-72"}>Generation Six</option>
        <option value={"721-88"}>Generation Seven</option>
        <option value={"809-96"}>Generation Eight</option>
        <option value={"905-120"}>Generation Nine</option>
      </select>
    </div>
  );
};

export default SelectGeneration;
