"use-client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

// react icons
import { GoLinkExternal } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";

const productsData = [];

// [
//   {
//     id: 1,
//     name: "Apple iPhone 14 Pro, LTPO Super Retina XDR OLED 6.1",
//     image: "https://i.ibb.co/d4jgmFW/01.png",
//     productLink: "",
//   },
//   {
//     id: 2,
//     name: "Mobile Phone Nokia 8210, Dual SIM, 4G",
//     image: "https://i.ibb.co/fCpcnhM/02.png",
//     productLink: "",
//   },
//   {
//     id: 3,
//     name: "SONY SRSXV900, Wireless Party Speaker, MEGA BASS",
//     image: "https://i.ibb.co/2dYkwd3/03-1.png",
//     productLink: "",
//   },
//   {
//     id: 4,
//     name: "Headphones, Noise cancelling, Bluetooth 5.0",
//     image: "https://i.ibb.co/f8xPk0G/04-1.png",
//     productLink: "",
//   },
//   {
//     id: 5,
//     name: "D-SLR Canon EOS R10, 4k, DIGIC X, RF-S 18-45mm",
//     image: "https://i.ibb.co/dg7FmKY/05-1.png",
//     productLink: "",
//   },
// ];

const Searchbar = () => {
  const [filteredData, setFilteredData] = useState(productsData);
  const [inputText, setInputText] = useState("");
  const [inputFocus, setInputFocus] = useState(true);

  useEffect(() => {
    const filtered = productsData?.filter((product) => {
      if (inputText === "") {
        return productsData;
      } else {
        return product?.name.toLowerCase().includes(inputText);
      }
    });

    setFilteredData(filtered);
  }, [inputText]);

  function truncate(text, maxLength, ellipsis = "...") {
    if (text?.length <= maxLength) {
      return text;
    }
    return text?.slice(0, maxLength - ellipsis?.length) + ellipsis;
  }

  return (
    <div className="relative min-w-32 w-full">
      <Input
        type="text"
        placeholder="Search..."
        className="px-4 focus-visible:ring-0 rounded-full w-full pl-[40px] outline-none focus:border-primary"
        onChange={(e) => setInputText(e.target.value)}
        onClick={() => setInputFocus(true)}
      />
      <IoIosSearch className="absolute top-[7px] left-2 text-[1.5rem] text-[#adadad]" />

      <div
        className={`${
          inputFocus
            ? "opacity-100 h-auto translate-y-0"
            : "translate-y-[-10px] opacity-0 h-0"
        }  bg-white w-full transition-all duration-500 overflow-hidden flex flex-col rounded-md`}
      >
        {filteredData?.map((product) => (
          <div
            key={product?.id}
            className="flex items-center justify-between w-full px-6 py-4 hover:bg-gray-50 cursor-pointer rounded-md"
          >
            <div className="flex items-center gap-[10px]">
              <img
                src={product?.image}
                alt="product/image"
                className="w-[30px] h-[30px] object-cover"
              />
              <h1 className="text-[0.9rem] sm:text-[1.1rem] text-gray-700 font-[400]">
                {truncate(product?.name, 60)}
              </h1>
            </div>
            <GoLinkExternal className="text-[1.3rem] text-gray-400" />
          </div>
        ))}

        {/* {!filteredData?.length && (
          <p className="text-[0.9rem] py-3 text-[#a0a0a0] text-center">
            No search matched!
          </p>
        )} */}
      </div>
    </div>
  );
};

export default Searchbar;
