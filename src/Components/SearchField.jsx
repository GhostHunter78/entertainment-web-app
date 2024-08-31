import IconSearch from "../SVGs/IconSearch";

function SearchField() {
  return (
    <div className="w-full grid relative mt-6 cursor-pointer">
      <input
        id="searchInput"
        className="bg-BgBody py-4 pl-[74px] pr-8 border-none rounded ml-26 text-[16px] text-white font-normal outfit font-weight-400 leading-20 outline-none lg:text-[20px]"
        type="text"
        placeholder="Search for movies or TV series"
      />
      <label className="absolute grid place-items-center top-[-2px] bottom-0">
        <button className="bg-transparent border-0 p-5 outline-none">
          <IconSearch />
        </button>
      </label>
    </div>
  );
}

export default SearchField;
