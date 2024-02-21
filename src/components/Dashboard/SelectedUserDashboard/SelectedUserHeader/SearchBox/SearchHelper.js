"use client";
import { PlusIcon } from "@/Icons";
import { motion } from "framer-motion";
import { subhasData, DatesData } from "@/Constant";
import { GenerateSeachHelperUserData } from "@/Helper/HelperFunctions";
import Image from "next/image";
export default function SearchHelper({
  input = "",
  AddNewSelectedOption,
  searchBoxRef,
}) {
  const subfromUserData = GenerateSeachHelperUserData();

  return (
    <motion.div
      layout={"position"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className={`px-[20px] py-[10px] `}
    >
      <div
        className={`${
          input.length < 3 ? "" : "rounded"
        } h-[56px] px-[20px] py-[10px] -mx-[20px] -mt-[10px]  flex items-center justify-between bg-theme-Graphite-750`}
      >
        <div className="flex items-center gap-1 text-xs font-bold">
          <p className="text-theme-SteelGray-500">SEARCH FOR:</p>
          <p className="text-theme-White-100  text-sm text-ellipsis whitespace-nowrap overflow-hidden max-w-[150px]">
            {input}
          </p>
        </div>
        <div className="shadow-[0px_2px_0px_hsl(235,51.44%,52.35%)] mb-[2px] rounded-lg hover:shadow-[0px] hover:translate-y-[2px] ">
          <button className="bg-theme-Brand text-xs font-semibold text-theme-White-100 p-1 rounded">
            <span> ENTER </span>
          </button>
        </div>
      </div>
      {input.length < 3 ? (
        <>
          <div className="h-2" />
          <div datatype="select-option">
            <List
              varient={"secondary"}
              heading={"MESSAGE CONTAINS"}
              AddNewSelectedOption={AddNewSelectedOption}
              searchBoxRef={searchBoxRef}
              data={subhasData}
            />
            <div className="h-[1px] bg-theme-Graphite-800 my-1" />
            <List
              heading={"FROM USER"}
              AddNewSelectedOption={AddNewSelectedOption}
              searchBoxRef={searchBoxRef}
              data={subfromUserData}
            />
            <div className="h-[1px] bg-theme-Graphite-800 my-1" />
            <List
              heading={"MENTIONS USER"}
              AddNewSelectedOption={AddNewSelectedOption}
              searchBoxRef={searchBoxRef}
              data={subfromUserData}
            />
            <div className="h-[1px] bg-theme-Graphite-800 my-1" />
            <List
              varient={"secondary"}
              AddNewSelectedOption={AddNewSelectedOption}
              searchBoxRef={searchBoxRef}
              heading={"DATES"}
              data={DatesData}
            />
          </div>
        </>
      ) : undefined}
    </motion.div>
  );
}

function List({ heading, data, varient, AddNewSelectedOption, searchBoxRef }) {
  return (
    <>
      <div className="h-[27px] flex justify-between items-center text-theme-SteelGray-light">
        <p className="text-xs font-bold">{heading}</p>
      </div>

      {varient === "secondary"
        ? data.map(({ label, value }, index) => (
            <div
              key={index}
              data-label={[label, value]}
              onClick={() => {
                AddNewSelectedOption([label, value]);
                searchBoxRef.current.focus();
              }}
              className="group data-[active=true]:text-theme-LightGray-200 data-[active=true]:bg-gradient-to-r hover:text-theme-LightGray-200  hover:bg-gradient-to-r from-theme-CharcoalGray-800 from-80% to-theme-Graphite-700 h-[34px] rounded flex items-center justify-between px-[10px] -mx-[10px] -mr-[11px] text-theme-SteelGray-light"
            >
              <div className="group-hover:text-theme-LightGray-200 groud-data-[active=true]:text-theme-LightGray-200 flex items-center">
                <p className="">
                  {label}{" "}
                  <span className="group-hover:text-theme-LightGray-200 group-data-[active=true]:text-theme-LightGray-200 font-semibold text-theme-SteelGray-500">
                    {value}
                  </span>
                </p>
              </div>
              <PlusIcon className="hidden group-data-[active=true]:block group-hover:block h-[18p] w-[18px]" />
            </div>
          ))
        : data.map(({ label, image, name }) => (
            <motion.div
              layout="preserve-aspect"
              data-label={[label, name]}
              key={name}
              onClick={() => {
                AddNewSelectedOption([label, name]);
                searchBoxRef.current.focus();
              }}
              className="group data-[active=true]:text-theme-LightGray-200 data-[active=true]:bg-gradient-to-r hover:text-theme-LightGray-200  hover:bg-gradient-to-r from-theme-CharcoalGray-800 from-80% to-theme-Graphite-700 h-[34px] rounded flex items-center justify-between px-[10px] -mx-[10px] -mr-[11px] text-theme-SteelGray-light"
            >
              <div className="group-hover:text-theme-LightGray-200 group-data-[active=true]:text-theme-LightGray-200 gap-1 flex items-center">
                <p className="">{label} </p>
                <div className="flex items-center gap-1">
                  <Image
                    src={image}
                    height={20}
                    width={20}
                    alt={name}
                    className="h-[20px] w-[20px] rounded-full bg-green-500"
                  />
                  <p className="text-sm font-semibold text-theme-LightGray-300">
                    {name}
                  </p>
                </div>
              </div>
              <PlusIcon className="hidden group-data-[active=true]:block group-hover:block h-[18p] w-[18px]" />
            </motion.div>
          ))}
    </>
  );
}

//---------------------------------------------
// import { PlusIcon } from "@/Icons";

// const subhasData = [
//   {
//     label: "has:",
//     value: "sound",
//   },
//   {
//     label: "has:",
//     value: "sticker",
//   },
// ];
// const subfromUserData = [
//   {
//     label: "from:",
//     image: "xyz",
//     name: "Groot Singh",
//   },
//   {
//     label: "from:",
//     image: "xyz",
//     name: "vkSingh",
//   },
// ];

// const DatesData = [
//   {
//     label: "before:",
//     value: "august",
//   },
//   {
//     label: "during:",
//     value: "august",
//   },
//   {
//     label: "after:",
//     value: "august",
//   },
// ];
// export default function SearchHelper({
//   input = "",
//   AddNewSelectedOption,
//   searchBoxRef,
// }) {
//   return (
//     <div
//       className={`${
//         input.length < 3 ? "bg-theme-Slate-300" : ""
//       } w-[320px] px-[20px] py-[10px] overflow-hidden searchbox-popup-position rounded `}
//     >
//       <div
//         className={`${
//           input.length < 3 ? "" : "rounded"
//         } h-[56px] px-[20px] py-[10px] -mx-[20px] -mt-[10px]  flex items-center justify-between bg-theme-Graphite-750`}
//       >
//         <div className="flex items-center gap-1 text-xs font-bold">
//           <p className="text-theme-SteelGray-500">SEARCH FOR:</p>
//           <p className="text-theme-White-100  text-sm text-ellipsis whitespace-nowrap overflow-hidden max-w-[150px]">
//             {input}
//           </p>
//         </div>
//         <div className="shadow-[0px_2px_0px_hsl(235,51.44%,52.35%)] mb-[2px] rounded-lg hover:shadow-[0px] hover:translate-y-[2px] ">
//           <button className="bg-theme-Brand text-xs font-semibold text-theme-White-100 p-1 rounded">
//             <span> ENTER </span>
//           </button>
//         </div>
//       </div>
//       {input.length < 3 ? (
//         <>
//           <div className="h-2" />
//           <div datatype="select-option">
//             <List
//               varient={"secondary"}
//               heading={"MESSAGE CONTAINS"}
//               AddNewSelectedOption={AddNewSelectedOption}
//               searchBoxRef={searchBoxRef}
//               data={subhasData}
//             />
//             <div className="h-[1px] bg-theme-Graphite-800 my-1" />
//             <List
//               heading={"FROM USER"}
//               AddNewSelectedOption={AddNewSelectedOption}
//               searchBoxRef={searchBoxRef}
//               data={subfromUserData}
//             />
//             <div className="h-[1px] bg-theme-Graphite-800 my-1" />
//             <List
//               heading={"MENTIONS USER"}
//               AddNewSelectedOption={AddNewSelectedOption}
//               searchBoxRef={searchBoxRef}
//               data={subfromUserData}
//             />
//             <div className="h-[1px] bg-theme-Graphite-800 my-1" />
//             <List
//               varient={"secondary"}
//               AddNewSelectedOption={AddNewSelectedOption}
//               searchBoxRef={searchBoxRef}
//               heading={"DATES"}
//               data={DatesData}
//             />
//           </div>
//         </>
//       ) : undefined}
//     </div>
//   );
// }

// function List({ heading, data, varient, AddNewSelectedOption, searchBoxRef }) {
//   return (
//     <>
//       <div className="h-[27px] flex justify-between items-center text-theme-SteelGray-light">
//         <p className="text-xs font-bold">{heading}</p>
//       </div>

//       {varient === "secondary"
//         ? data.map(({ label, value }) => (
//             <div
//               key={label}
//               data-label={[label, value]}
//               onClick={() => {
//                 AddNewSelectedOption([label, value]);
//                 searchBoxRef.current.focus();
//               }}
//               className="group data-[active=true]:text-theme-LightGray-200 data-[active=true]:bg-gradient-to-r hover:text-theme-LightGray-200  hover:bg-gradient-to-r from-theme-CharcoalGray-800 from-80% to-theme-Graphite-700 h-[34px] rounded flex items-center justify-between px-[10px] -mx-[10px] -mr-[11px] text-theme-SteelGray-light"
//             >
//               <div className="group-hover:text-theme-LightGray-200 groud-data-[active=true]:text-theme-LightGray-200 flex items-center">
//                 <p className="">
//                   {label}{" "}
//                   <span className="group-hover:text-theme-LightGray-200 group-data-[active=true]:text-theme-LightGray-200 font-semibold text-theme-SteelGray-500">
//                     {value}
//                   </span>
//                 </p>
//               </div>
//               <PlusIcon className="hidden group-data-[active=true]:block group-hover:block h-[18p] w-[18px]" />
//             </div>
//           ))
//         : data.map(({ label, image, name }) => (
//             <div
//               data-label={[label, name]}
//               key={label + name}
//               onClick={() => {
//                 AddNewSelectedOption([label, name]);
//                 searchBoxRef.current.focus();
//               }}
//               className="group data-[active=true]:text-theme-LightGray-200 data-[active=true]:bg-gradient-to-r hover:text-theme-LightGray-200  hover:bg-gradient-to-r from-theme-CharcoalGray-800 from-80% to-theme-Graphite-700 h-[34px] rounded flex items-center justify-between px-[10px] -mx-[10px] -mr-[11px] text-theme-SteelGray-light"
//             >
//               <div className="group-hover:text-theme-LightGray-200 group-data-[active=true]:text-theme-LightGray-200 gap-1 flex items-center">
//                 <p className="">{label} </p>
//                 <div className="flex items-center gap-1">
//                   <div className="h-[20px] w-[20px] rounded-full bg-green-500" />
//                   <p className="text-sm font-semibold text-theme-LightGray-300">
//                     {name}
//                   </p>
//                 </div>
//               </div>
//               <PlusIcon className="hidden group-data-[active=true]:block group-hover:block h-[18p] w-[18px]" />
//             </div>
//           ))}
//     </>
//   );
// }
