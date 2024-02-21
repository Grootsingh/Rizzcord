import { PlusIcon } from "@/Icons";
import { motion } from "framer-motion";
import { pinnedData } from "@/Constant";
export default function SearchPinned({ AddNewSelectedOption, searchBoxRef }) {
  return (
    <motion.div
      datatype="select-option"
      layout={"position"}
      className="px-[20px] py-[10px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      {pinnedData.map((type, index) => (
        <div
          key={index}
          data-label={type}
          onClick={() => {
            AddNewSelectedOption(type);
            searchBoxRef.current.focus();
          }}
          className=" group data-[active=true]:bg-gradient-to-r  hover:bg-gradient-to-r from-theme-CharcoalGray-800 from-80% to-theme-Graphite-700 h-[34px] rounded flex items-center justify-between px-[10px] -mx-[10px] -mr-[11px]"
        >
          <p className="text-sm font-semibold text-theme-SteelGray-500 group-data-[active=true]:text-theme-LightGray-200  group-hover:text-theme-LightGray-200">
            {type}
          </p>

          <PlusIcon className="hidden group-data-[active=true]:block group-hover:block h-[18p] w-[18px] group-data-[active=true]:text-theme-LightGray-200  group-hover:text-theme-LightGray-200" />
        </div>
      ))}
    </motion.div>
  );
}
