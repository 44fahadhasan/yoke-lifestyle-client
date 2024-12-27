import SiteLogo from "@/components/common/SiteLogo";
import SocialIcons from "@/components/common/SocialIcons";
import Container from "@/components/reusable/Container";
import Ecommerce from "../../shared/Ecommerce/Ecommerce";

const TopNav = () => {
  return (
    <Container className={"w-[95%] py-2 lg:py-2"}>
      <div className="flex justify-between items-center">
        <SocialIcons />

        <SiteLogo />

        <Ecommerce foreground />
      </div>
    </Container>
  );
};

export default TopNav;
