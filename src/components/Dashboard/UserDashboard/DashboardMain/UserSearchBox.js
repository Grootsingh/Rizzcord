"use client";
import { SearchIcon, CloseIcon } from "@/Icons";
import React, { useEffect } from "react";

function UserSearchBox({ searchFilter, isActive }, ref) {
  const [isInput, setIsInput] = React.useState("");
  const [isSearch, setIsSearch] = React.useState(false);

  useEffect(() => {
    if (document.activeElement === ref.current) {
      searchFilter(isInput);
    }
  }, [isInput, searchFilter]);

  useEffect(() => {
    setIsInput("");
  }, [isActive]);

  useEffect(() => {
    if (isSearch) {
      ref.current.focus();
      setIsSearch(false);
    }
  }, [isSearch]);

  return (
    <div className="h-[70px] pl-[30px] pr-[20px] flex items-center text-theme-SteelGray-500">
      <label htmlFor="Search" className="sr-only">
        Search
      </label>
      <div className="relative flex items-center grow">
        <input
          type="text"
          name="Search"
          placeholder="Search"
          id="Search"
          autoComplete="off"
          size={1}
          ref={ref}
          value={isInput}
          onChange={(event) => setIsInput(event.target.value)}
          className=" bg-theme-DarkGray-900 outline-none min-w-[100px] rounded grow h-[34px]  px-2"
        />
        {isInput ? (
          <button
            className="absolute right-2"
            onClick={() => {
              setIsInput("");
            }}
          >
            <CloseIcon className=" h-[20px] w-[20px]" />
          </button>
        ) : (
          <button
            className="absolute right-2 "
            onClick={() => setIsSearch(true)}
          >
            <SearchIcon className=" h-[20px] w-[20px]" />
          </button>
        )}
      </div>
    </div>
  );
}

export default UserSearchBox = React.forwardRef(UserSearchBox);
//-----------------------------------------------------------------
// "use client";
// import { SearchIcon, CloseIcon } from "@/Icons";
// import React, { useEffect } from "react";

// export default function UserSearchBox({ searchFilter, isActive }) {
//   const [isInput, setIsInput] = React.useState("");
//   const [isSearch, setIsSearch] = React.useState(false);

//   useEffect(() => {
//     if (document.activeElement === inputref.current) {
//       searchFilter(isInput);
//     }
//   }, [isInput, searchFilter]);

//   useEffect(() => {
//     setIsInput("");
//   }, [isActive]);

//   const inputref = React.useRef();

//   useEffect(() => {
//     if (isSearch) {
//       inputref.current.focus();
//       setIsSearch(false);
//     }
//   }, [isSearch]);

//   return (
//     <div className="h-[70px] pl-[30px] pr-[20px] flex items-center text-theme-SteelGray-500">
//       <label htmlFor="Search" className="sr-only">
//         Search
//       </label>
//       <div className="relative flex items-center grow">
//         <input
//           type="text"
//           name="Search"
//           placeholder="Search"
//           id="Search"
//           autoComplete="off"
//           size={1}
//           ref={inputref}
//           value={isInput}
//           onChange={(event) => setIsInput(event.target.value)}
//           className=" bg-theme-DarkGray-900 outline-none min-w-[100px] rounded grow h-[34px]  px-2"
//         />
//         {isInput ? (
//           <button
//             className="absolute right-2"
//             onClick={() => {
//               setIsInput("");
//             }}
//           >
//             <CloseIcon className=" h-[20px] w-[20px]" />
//           </button>
//         ) : (
//           <button
//             className="absolute right-2 "
//             onClick={() => setIsSearch(true)}
//           >
//             <SearchIcon className=" h-[20px] w-[20px]" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
