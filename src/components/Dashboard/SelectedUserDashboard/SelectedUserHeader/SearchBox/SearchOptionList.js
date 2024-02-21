import { PlusIcon, HelpIcon } from "@/Icons";
import ToolTip from "@/components/ToolTip";
import SearchHistory from "./SearchHistory";
import { SearchOptions } from "@/Constant";
import { motion } from "framer-motion";
export default function SearchOptionList({
  AddNewSelectedOption,
  searchBoxRef,
  isSelectedFromOptionList,
  setIsSelectedFromOptionList,
  TrueDeleteHistory,
}) {
  function AddSelected(label = "", value) {
    const newSearch = {
      label,
      value,
      id: crypto.randomUUID(),
    };
    if (isSelectedFromOptionList.length > 4) {
      isSelectedFromOptionList.pop();
    }
    setIsSelectedFromOptionList([newSearch, ...isSelectedFromOptionList]);
  }

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="h-[27px] flex justify-between items-center text-theme-SteelGray-light">
        <p className="text-xs font-bold">SEARCH OPTIONS</p>
        <ToolTip direction={"Right"} text={"Learn More"}>
          <HelpIcon className="h-4 w-4" />
        </ToolTip>
      </div>
      <div datatype="select-option">
        <SelectOptions
          AddSelected={AddSelected}
          searchBoxRef={searchBoxRef}
          AddNewSelectedOption={AddNewSelectedOption}
        />
        {isSelectedFromOptionList.length > 0 ? (
          <SearchHistory
            isSelectedFromOptionList={isSelectedFromOptionList}
            setIsSelectedFromOptionList={setIsSelectedFromOptionList}
            searchBoxRef={searchBoxRef}
            AddNewSelectedOption={AddNewSelectedOption}
            TrueDeleteHistory={TrueDeleteHistory}
          />
        ) : undefined}
      </div>
    </motion.div>
  );
}

function SelectOptions({ AddSelected, AddNewSelectedOption, searchBoxRef }) {
  return (
    <>
      {SearchOptions.map(({ label, value }) => (
        <div
          key={label}
          data-label={label}
          onClick={() => {
            AddSelected(label, value);
            AddNewSelectedOption(label);
            searchBoxRef.current.focus();
          }}
          className={`cursor-pointer data-[active=true]:text-theme-LightGray-200 data-[active=true]:bg-gradient-to-r group hover:text-theme-LightGray-200  hover:bg-gradient-to-r from-theme-CharcoalGray-800 from-80% to-theme-Graphite-700 h-[34px] rounded flex items-center justify-between px-[10px] -mx-[10px] -mr-[11px] text-theme-SteelGray-light`}
        >
          <div className="group-data-[active=true]:text-theme-LightGray-200 group-hover:text-theme-LightGray-200 flex items-center">
            <p className=" font-semibold">
              {label}{" "}
              <span className="group-data-[active=true]:text-theme-LightGray-200 group-hover:text-theme-LightGray-200 text-sm text-theme-SteelGray-500">
                {value}
              </span>
            </p>
          </div>
          <PlusIcon className="hidden  group-data-[active=true]:block group-hover:block h-[18p] w-[18px]" />
        </div>
      ))}
    </>
  );
}
