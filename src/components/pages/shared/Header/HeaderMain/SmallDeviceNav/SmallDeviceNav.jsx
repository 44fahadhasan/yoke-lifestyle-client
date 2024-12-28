import SiteLogo from "@/components/common/SiteLogo";
import Container from "@/components/reusable/Container";
import Ecommerce from "../shared/Ecommerce/Ecommerce";
import Searchbar from "../shared/Searchbar/Searchbar";
import SideNav from "./SideNav";

const SmallDeviceNav = () => {
  return (
    <section className="fixed left-0 top-0 right-0 bg-background border-b shadow">
      <Container
        className={"flex items-center gap-x-5 gap-y-2 w-[95%] py-2 lg:py-2"}
      >
        <SiteLogo />

        <Searchbar />

        <div className="hidden xs:block">
          <Ecommerce />
        </div>

        <SideNav />
      </Container>
    </section>
  );
};

export default SmallDeviceNav;
