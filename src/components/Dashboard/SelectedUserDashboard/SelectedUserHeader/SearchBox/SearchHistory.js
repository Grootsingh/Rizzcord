import { TrashCanIcon, PlusIcon } from "@/Icons";
import ToolTip from "@/components/ToolTip";

export default function SearchHistory({
  isSelectedFromOptionList,
  setIsSelectedFromOptionList,
  searchBoxRef,
  AddNewSelectedOption,
  TrueDeleteHistory,
}) {
  return (
    <>
      <div className="h-[1px] bg-theme-Graphite-800 my-1" />
      <div className="h-[27px] flex justify-between items-center text-theme-SteelGray-light">
        <p className="text-xs font-bold">SEARCH OPTIONS</p>
        <button
          onClick={() => {
            setIsSelectedFromOptionList([]);
            searchBoxRef.current.focus();
            TrueDeleteHistory();
          }}
        >
          <ToolTip direction={"Right"} text={"Clear Search History"}>
            <TrashCanIcon className="h-[14px] w-[14px]" />
          </ToolTip>
        </button>
      </div>
      {isSelectedFromOptionList.map(({ label, value, id }) => (
        <div
          key={id}
          data-label={label}
          onClick={() => {
            AddNewSelectedOption(label);
            searchBoxRef.current.focus();
          }}
          className="group cursor-pointer data-[active=true]:text-theme-LightGray-200 hover:text-theme-LightGray-200 data-[active=true]:bg-gradient-to-r  hover:bg-gradient-to-r from-theme-CharcoalGray-800 from-80% to-theme-Graphite-700 h-[34px] rounded flex items-center justify-between px-[10px] -mx-[10px] -mr-[11px] text-theme-SteelGray-light"
        >
          <div className="group-data-[active=true]:text-theme-LightGray-200 group-hover:text-theme-LightGray-200 flex items-center">
            <p className="">
              {label}{" "}
              <span className="group-data-[active=true]:text-theme-LightGray-200 group-hover:text-theme-LightGray-200 font-semibold text-sm text-theme-SteelGray-500">
                {value}
              </span>
            </p>
          </div>
          <PlusIcon className="hidden group-data-[active=true]:block group-hover:block h-[18p] w-[18px]" />
        </div>
      ))}
    </>
  );
}
