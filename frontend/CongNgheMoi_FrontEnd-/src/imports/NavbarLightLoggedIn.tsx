import svgPaths from "./svg-u5unypdo7g";
import imgGeneralImageSquare1 from "figma:asset/95bca3ecaf6d28d115834f85b6163b6e58e91c7c.png";
import { imgGeneralImageSquare } from "./svg-qdegh";

function Frame() {
  return (
    <div className="absolute bg-[#3dcbb1] inset-[0_71.63%_0_0] overflow-clip rounded-[190px]">
      <div className="absolute bg-[#3dcbb1] left-[4.7px] rounded-[74.219px] size-[33.594px] top-[4.7px]" />
      <p className="absolute font-['Gilroy:Heavy',sans-serif] leading-[50.801px] left-[5.38px] not-italic text-[38.71px] text-white top-[4.7px] whitespace-nowrap">m</p>
    </div>
  );
}

function Browse() {
  return (
    <div className="absolute contents inset-[33.33%_73.61%_31.67%_20.9%]" data-name="Browse">
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[33.33%_75.42%_31.67%_20.9%] leading-[21px] not-italic text-[#1b1b1b] text-[16px] whitespace-nowrap">Browse</p>
      <div className="absolute inset-[33.33%_73.61%_31.67%_24.93%]" data-name="expand_more_24px">
        <div className="absolute inset-[36.28%_26.72%]" data-name="icon/navigation/expand_more_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.77813 5.76186">
            <path d={svgPaths.p38d0ca00} fill="var(--fill-0, #1B1B1B)" id="icon/navigation/expand_more_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="absolute contents left-[35.42%] right-[36.81%] top-[12px]" data-name="Search">
      <div className="absolute bg-[rgba(249,249,249,0.9)] h-[37px] left-[35.42%] right-[36.81%] rounded-[3px] top-[12px]" />
      <p className="absolute font-['Gilroy:Regular',sans-serif] leading-[21px] left-[522px] not-italic text-[16px] text-[rgba(27,27,27,0.6)] top-[20px] whitespace-nowrap">Search for course</p>
      <div className="absolute right-[542px] size-[21px] top-[20px]" data-name="search_24px">
        <div className="absolute inset-[14.46%_14.48%]" data-name="icon/action/search_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9168 14.9256">
            <path d={svgPaths.pa3f6f00} fill="var(--fill-0, #1B1B1B)" id="icon/action/search_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents right-[120px] top-[12px]" data-name="Mask Group">
      <div className="absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[36px_36px] right-[120px] rounded-[100px] size-[36px] top-[12px]" data-name="General / Image / Square" style={{ maskImage: `url('${imgGeneralImageSquare}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgGeneralImageSquare1} />
      </div>
    </div>
  );
}

export default function NavbarLightLoggedIn() {
  return (
    <div className="relative size-full" data-name="Navbar / Light / Logged In">
      <div className="absolute h-[43px] left-[105px] top-[9px] w-[151.592px]" data-name="Logo">
        <Frame />
        <p className="absolute font-['Gilroy:ExtraBold',sans-serif] inset-[22.85%_-0.03%_22.41%_32.85%] leading-[23.343px] not-italic text-[17.79px] text-black whitespace-nowrap">MyCourse.io</p>
      </div>
      <Browse />
      <p className="absolute font-['Gilroy:Regular',sans-serif] leading-[21px] not-italic right-[392px] text-[#1b1b1b] text-[16px] top-[20px] translate-x-full whitespace-nowrap">Become Instructor</p>
      <Search />
      <div className="absolute right-[212px] size-[24px] top-[18px]" data-name="shopping_cart_24px">
        <div className="absolute inset-[8.33%_8.32%]" data-name="icon/action/shopping_cart_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0073 20">
            <path d={svgPaths.p2e2adb00} fill="var(--fill-0, #1B1B1B)" id="icon/action/shopping_cart_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute right-[172px] size-[24px] top-[18px]" data-name="notifications_none_24px">
        <div className="absolute inset-[9.38%_18.39%]" data-name="icon/social/notifications_none_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1725 19.5">
            <path d={svgPaths.pef97900} fill="var(--fill-0, #1B1B1B)" id="icon/social/notifications_none_24px" />
          </svg>
        </div>
      </div>
      <MaskGroup />
    </div>
  );
}