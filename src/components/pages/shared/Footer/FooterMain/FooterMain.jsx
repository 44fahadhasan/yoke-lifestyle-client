import FooterTop from "../FooterTop/FooterTop";
import FooterBottom from "./FooterBottom";
import FooterMiddle from "./FooterMiddle";

const FooterMain = () => {
  return (
    <>
      <FooterTop />

      <FooterMiddle />

      <hr className="mt-7 border-gray-600 container w-[87%] mx-auto" />

      <FooterBottom />
    </>
  );
};

export default FooterMain;
