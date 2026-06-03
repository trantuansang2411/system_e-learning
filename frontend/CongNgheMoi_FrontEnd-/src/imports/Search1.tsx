import svgPaths from "./svg-0ipw38em9c";
import imgPlaceholder2 from "figma:asset/13d656b853149532a6de40da48658b3f88d91f73.png";
import imgPlaceholder3 from "figma:asset/e76e0ddaaa5c5b28b1d5e5591617e909b3b24ccc.png";
import imgPlaceholder4 from "figma:asset/8bb6ad24279a44450b38c3fb0c8168706af3c700.png";
import imgPlaceholder5 from "figma:asset/bea99bca2865041df3ac26b9b339b24e61ba8313.png";
import imgPlaceholder6 from "figma:asset/1bc2886aed9056a0b937d9b6dac2d6d756fff2d2.png";
import imgPlaceholder7 from "figma:asset/a04e01ed50d9497cfd894d1bef3d4f19519b73fa.png";
import imgPlaceholder8 from "figma:asset/e14924aa12827a29123663bc5d0c7e37562ecb36.png";
import imgPlaceholder9 from "figma:asset/abf9514ed05dfd544b8a15f8b74e4c60a96534d1.png";
import imgPlaceholder10 from "figma:asset/e460223f6f1215c27fbf0f3b9a8bb3d6957782dd.png";
import imgPlaceholder11 from "figma:asset/32329f7e5ff984311a578929f83ddcf74a23bc31.png";
import imgPlaceholder12 from "figma:asset/328e56d5e52d70944073635318e44d132473e832.png";
import imgPlaceholder13 from "figma:asset/4052b68a1e7b2e53ff988154a520929af731ce8a.png";
import imgGeneralImageSquare1 from "figma:asset/95bca3ecaf6d28d115834f85b6163b6e58e91c7c.png";
import { imgPlaceholder1, imgRhone, imgRhone1, imgGeneralImageSquare } from "./svg-928s3";

function Thumbnail() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder2} />
      </div>
    </div>
  );
}

function Component1stLabel() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel />
      <Component2ndLabel />
    </div>
  );
}

function Instructor() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Thumbnail1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder3} />
      </div>
    </div>
  );
}

function Component1stLabel1() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel1() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail1 />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel1 />
      <Component2ndLabel1 />
    </div>
  );
}

function Instructor1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group1 />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Thumbnail2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder4} />
      </div>
    </div>
  );
}

function Component1stLabel2() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel2() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail2 />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel2 />
      <Component2ndLabel2 />
    </div>
  );
}

function Instructor2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group2 />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Cards() {
  return (
    <div className="absolute contents left-[calc(25%+65px)] top-[157px]" data-name="Cards">
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(25%+65px)] top-[157px]" data-name="Card / Option 1">
        <ThumbnailImage />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px]">Adobe Illustrator Scretch Course</p>
        <Instructor />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...</p>
        <Rating />
        <Price />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(75%-45px)] top-[157px]" data-name="Card / Option 1">
        <ThumbnailImage1 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px]">Design Fundamentals</p>
        <Instructor1 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...</p>
        <Rating1 />
        <Price1 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(50%+10px)] top-[157px]" data-name="Card / Option 1">
        <ThumbnailImage2 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px] whitespace-pre-wrap">{`Bootcamp  Vue.js Web Framework`}</p>
        <Instructor2 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">Learn how to make web application with Vue.js Framework.</p>
        <Rating2 />
        <Price2 />
      </div>
    </div>
  );
}

function Interest() {
  return (
    <div className="absolute contents left-[calc(25%+65px)] top-[157px]" data-name="Interest">
      <Cards />
    </div>
  );
}

function Thumbnail3() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder5} />
      </div>
    </div>
  );
}

function Component1stLabel3() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel3() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail3 />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel3 />
      <Component2ndLabel3 />
    </div>
  );
}

function Instructor3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group3 />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Thumbnail4() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder6} />
      </div>
    </div>
  );
}

function Component1stLabel4() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel4() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail4 />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel4 />
      <Component2ndLabel4 />
    </div>
  );
}

function Instructor4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group4 />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Thumbnail5() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder7} />
      </div>
    </div>
  );
}

function Component1stLabel5() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel5() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail5 />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel5 />
      <Component2ndLabel5 />
    </div>
  );
}

function Instructor5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group5 />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Cards1() {
  return (
    <div className="absolute contents left-[calc(25%+65px)] top-[481px]" data-name="Cards">
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(25%+65px)] top-[481px]" data-name="Card / Option 1">
        <ThumbnailImage3 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px]">Adobe Illustrator Scretch Course</p>
        <Instructor3 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...</p>
        <Rating3 />
        <Price3 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(75%-45px)] top-[481px]" data-name="Card / Option 1">
        <ThumbnailImage4 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px]">Design Fundamentals</p>
        <Instructor4 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...</p>
        <Rating4 />
        <Price4 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(50%+10px)] top-[481px]" data-name="Card / Option 1">
        <ThumbnailImage5 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px] whitespace-pre-wrap">{`Bootcamp  Vue.js Web Framework`}</p>
        <Instructor5 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">Learn how to make web application with Vue.js Framework.</p>
        <Rating5 />
        <Price5 />
      </div>
    </div>
  );
}

function Interest1() {
  return (
    <div className="absolute contents left-[calc(25%+65px)] top-[481px]" data-name="Interest">
      <Cards1 />
    </div>
  );
}

function Thumbnail6() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder8} />
      </div>
    </div>
  );
}

function Component1stLabel6() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel6() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail6 />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel6 />
      <Component2ndLabel6 />
    </div>
  );
}

function Instructor6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group6 />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Thumbnail7() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder9} />
      </div>
    </div>
  );
}

function Component1stLabel7() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel7() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail7 />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel7 />
      <Component2ndLabel7 />
    </div>
  );
}

function Instructor7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group7 />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Thumbnail8() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder10} />
      </div>
    </div>
  );
}

function Component1stLabel8() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel8() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail8 />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel8 />
      <Component2ndLabel8 />
    </div>
  );
}

function Instructor8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group8 />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Cards2() {
  return (
    <div className="absolute contents left-[calc(25%+65px)] top-[805px]" data-name="Cards">
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(25%+65px)] top-[805px]" data-name="Card / Option 1">
        <ThumbnailImage6 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px]">Adobe Illustrator Scretch Course</p>
        <Instructor6 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...</p>
        <Rating6 />
        <Price6 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(75%-45px)] top-[805px]" data-name="Card / Option 1">
        <ThumbnailImage7 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px]">Design Fundamentals</p>
        <Instructor7 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...</p>
        <Rating7 />
        <Price7 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(50%+10px)] top-[805px]" data-name="Card / Option 1">
        <ThumbnailImage8 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px] whitespace-pre-wrap">{`Bootcamp  Vue.js Web Framework`}</p>
        <Instructor8 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">Learn how to make web application with Vue.js Framework.</p>
        <Rating8 />
        <Price8 />
      </div>
    </div>
  );
}

function Interest2() {
  return (
    <div className="absolute contents left-[calc(25%+65px)] top-[805px]" data-name="Interest">
      <Cards2 />
    </div>
  );
}

function Thumbnail9() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder11} />
      </div>
    </div>
  );
}

function Component1stLabel9() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel9() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail9 />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel9 />
      <Component2ndLabel9 />
    </div>
  );
}

function Instructor9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group9 />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Thumbnail10() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder12} />
      </div>
    </div>
  );
}

function Component1stLabel10() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel10() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail10 />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel10 />
      <Component2ndLabel10 />
    </div>
  );
}

function Instructor10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group10 />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price10() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Thumbnail11() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder13} />
      </div>
    </div>
  );
}

function Component1stLabel11() {
  return (
    <div className="bg-[#3dcbb1] col-1 content-stretch flex items-center ml-[10.5px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="1stLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">Best Seller</p>
    </div>
  );
}

function Component2ndLabel11() {
  return (
    <div className="bg-[#a04ae3] col-1 content-stretch flex items-center ml-[66px] mt-[8px] overflow-clip p-[4px] relative rounded-[23px] row-1" data-name="2ndLabel">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[10px] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">20% OFF</p>
    </div>
  );
}

function ThumbnailImage11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail11 />
      <div className="col-1 ml-[255px] mt-[131px] relative rounded-[23px] row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
      <Component1stLabel11 />
      <Component2ndLabel11 />
    </div>
  );
}

function Instructor11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">MyCourse Studio</p>
      <div className="col-1 ml-0 mt-0 relative row-1 size-[18px]" data-name="person_outline_24px">
        <div className="absolute inset-[16.67%]" data-name="icon/social/person_outline_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p17243900} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/social/person_outline_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-px place-items-start relative row-1">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[18px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[36px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[54px] mt-0 relative row-1 size-[16px]" data-name="star_purple500_24px">
        <div className="absolute inset-[15.93%_14.35%]" data-name="icon/toggle/star_purple500_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4093 10.9039">
            <path d={svgPaths.p1d45c700} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
          </svg>
        </div>
      </div>
      <div className="col-1 ml-[72px] mt-0 relative row-1 size-[16px]" data-name="star_half_24px">
        <div className="absolute inset-[15.9%_14.34%]" data-name="icon/toggle/star_half_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4109 10.9105">
            <path d={svgPaths.p166fd300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Rating11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Rating">
      <Group11 />
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[91px] mt-0 not-italic relative row-1 text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">(1.2K)</p>
    </div>
  );
}

function Price11() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Price">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] relative shrink-0 text-[20px] text-[rgba(27,27,27,0.9)]">$24.92</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Gilroy:Regular',sans-serif] leading-[24px] line-through relative shrink-0 text-[16px] text-[rgba(27,27,27,0.6)]">$32.90</p>
    </div>
  );
}

function Cards3() {
  return (
    <div className="absolute contents left-[calc(25%+65px)] top-[1129px]" data-name="Cards">
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(25%+65px)] top-[1129px]" data-name="Card / Option 1">
        <ThumbnailImage9 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px]">Adobe Illustrator Scretch Course</p>
        <Instructor9 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...</p>
        <Rating9 />
        <Price9 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(75%-45px)] top-[1129px]" data-name="Card / Option 1">
        <ThumbnailImage10 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px]">Design Fundamentals</p>
        <Instructor10 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">More than 8yr Experience as Illustrator. Learn how to becoming professional Illustrator Now...</p>
        <Rating10 />
        <Price10 />
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(50%+10px)] top-[1129px]" data-name="Card / Option 1">
        <ThumbnailImage11 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px] whitespace-pre-wrap">{`Bootcamp  Vue.js Web Framework`}</p>
        <Instructor11 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">Learn how to make web application with Vue.js Framework.</p>
        <Rating11 />
        <Price11 />
      </div>
    </div>
  );
}

function Interest3() {
  return (
    <div className="absolute contents left-[calc(25%+65px)] top-[1129px]" data-name="Interest">
      <Cards3 />
    </div>
  );
}

function CourseList() {
  return (
    <div className="absolute contents left-[calc(25%+65px)] top-[157px]" data-name="Course List">
      <Interest />
      <Interest1 />
      <Interest2 />
      <Interest3 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[21px] overflow-clip relative shrink-0 w-full" data-name="Text">
      <p className="absolute font-['Gilroy:Regular',sans-serif] leading-[21px] left-0 not-italic text-[16px] text-[rgba(27,27,27,0.9)] top-0 whitespace-nowrap">Most Popular</p>
      <div className="absolute flex items-center justify-center right-0 size-[21px] top-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="relative size-[21px]" data-name="chevron_left_24px">
            <div className="absolute inset-[26.72%_36.28%]" data-name="icon/navigation/chevron_left_24px">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.76188 9.77811">
                <path d={svgPaths.p10e0c80} fill="var(--fill-0, #080E2F)" id="icon/navigation/chevron_left_24px" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OutlineMediumEnabled() {
  return (
    <div className="absolute left-[calc(83.33%-63px)] rounded-[3px] top-[92px] w-[183px]" data-name="Outline / Medium / Enabled">
      <div className="content-stretch flex flex-col items-start overflow-clip px-[18px] py-[10px] relative rounded-[inherit] w-full">
        <Text />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(27,27,27,0.6)] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function ResultSort() {
  return (
    <div className="absolute contents left-[calc(25%+64px)] top-[92px]" data-name="Result & Sort">
      <p className="absolute font-['Gilroy:Regular',sans-serif] leading-[0] not-italic right-[calc(50%+296px)] text-[16px] text-[rgba(27,27,27,0.9)] top-[102px] translate-x-full whitespace-nowrap">
        <span className="leading-[21px]">{`Showing 2,312 results of `}</span>
        <span className="font-['Gilroy:Bold',sans-serif] leading-[21px]">UI Design</span>
      </p>
      <OutlineMediumEnabled />
    </div>
  );
}

function Rhone() {
  return (
    <div className="absolute inset-[0_0_-3.61%_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[553px_415px]" data-name="Rhône" style={{ maskImage: `url('${imgRhone1}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 301.41 331.288">
        <g id="RhÃ´ne">
          <path d={svgPaths.p4434600} fill="var(--fill-0, #3699FF)" id="Shape" />
          <path d={svgPaths.p3bedfdf0} fill="var(--fill-0, #D6DA34)" id="Shape_2" />
          <path d={svgPaths.p4cb8500} fill="var(--fill-0, #6ED47C)" id="Shape_3" />
          <path d={svgPaths.p1abfbe80} fill="var(--fill-0, #D5E155)" id="Shape_4" />
          <path d={svgPaths.p1a87bd00} fill="var(--fill-0, #6ED47C)" id="Shape_5" />
          <path d={svgPaths.p2c5411c0} fill="var(--fill-0, #6ED47C)" id="Shape_6" />
          <path d={svgPaths.p36419d80} fill="var(--fill-0, #6ED47C)" id="Shape_7" />
          <path d={svgPaths.p3b2eb200} fill="var(--fill-0, #2D3652)" id="Shape_8" />
          <path d={svgPaths.p33444f2} fill="var(--fill-0, #FF743C)" id="Shape_9" />
          <path d={svgPaths.p347a2b80} fill="var(--fill-0, #FFC700)" id="Shape_10" />
          <path d={svgPaths.p33b06e80} fill="var(--fill-0, #FF743C)" id="Shape_11" />
          <path d={svgPaths.p2c2c8740} fill="var(--fill-0, #A04AE3)" id="Shape_12" />
          <path d={svgPaths.p30742900} fill="var(--fill-0, #FFC700)" id="Shape_13" />
          <path d={svgPaths.p21975400} fill="var(--fill-0, #FF743C)" id="Shape_14" />
          <path d={svgPaths.p2b44f600} fill="var(--fill-0, #2D3652)" id="Shape_15" />
          <path d={svgPaths.p258a5a00} fill="var(--fill-0, #FF743C)" id="Shape_16" />
          <path d={svgPaths.p2f9cdb00} fill="var(--fill-0, #3699FF)" id="Shape_17" />
          <path d={svgPaths.p20485900} fill="var(--fill-0, #6ED47C)" id="Shape_18" />
          <path d={svgPaths.p15419600} fill="var(--fill-0, #D5E155)" id="Shape_19" />
          <path d={svgPaths.p1750980} fill="var(--fill-0, #FFC700)" id="Shape_20" />
          <path d={svgPaths.p20ed7ec0} fill="var(--fill-0, #FF743C)" id="Shape_21" />
          <path d={svgPaths.p15425780} fill="var(--fill-0, #FF743C)" id="Shape_22" />
          <path d={svgPaths.pac0a140} fill="var(--fill-0, #2D3652)" id="Shape_23" />
        </g>
      </svg>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Mask Group">
      <div className="absolute inset-[-30.94%_0_-4.23%_53.92%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-647px_95px] mask-size-[1200px_307px]" data-name="Rhône" style={{ maskImage: `url('${imgRhone}')` }}>
        <div className="absolute inset-[17.35%_-1.81%_-1.2%_18.08%]" data-name="Rhône">
          <Rhone />
          <div className="absolute inset-[71.33%_37.43%_16.63%_44.48%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-246px_-296px] mask-size-[553px_415px]" data-name="Shape" style={{ maskImage: `url('${imgRhone1}')` }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 83.7251 41.9277">
              <path d={svgPaths.p32ed600} fill="var(--fill-0, #A04AE3)" id="Shape" />
            </svg>
          </div>
          <div className="absolute inset-[77.35%_37.43%_16.63%_53.53%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-296px_-321px] mask-size-[553px_415px]" data-name="Shape" style={{ maskImage: `url('${imgRhone1}')` }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.8625 20.9639">
              <path d={svgPaths.p2571a080} fill="var(--fill-0, #6ED47C)" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Text">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Join Klevr</p>
    </div>
  );
}

function Title() {
  return (
    <div className="absolute bottom-[19.54%] contents left-[60px] top-[19.54%]" data-name="Title">
      <p className="absolute bottom-[66.78%] font-['Gilroy:Bold',sans-serif] leading-[42px] left-[60px] not-italic text-[32px] text-white top-[19.54%] whitespace-nowrap">Join Klevr now to get 35% off</p>
      <div className="absolute bottom-[40.72%] font-['Gilroy:Regular',sans-serif] leading-[36px] left-[60px] not-italic text-[24px] text-[rgba(255,255,255,0.6)] top-[35.83%] whitespace-nowrap whitespace-pre">
        <p className="mb-0">{`With our responsive themes and mobile and desktop apps, `}</p>
        <p>enjoy a seamless experience on any device so will your blog the best visitors</p>
      </div>
      <div className="absolute bg-[#3dcbb1] bottom-[19.54%] content-stretch flex flex-col items-center left-[60px] overflow-clip px-[18px] py-[10px] rounded-[3px] top-[67.1%]" data-name="Primary / Medium / Enabled">
        <Text1 />
      </div>
    </div>
  );
}

function ChooseLargeDefault() {
  return (
    <div className="absolute h-[37px] left-[calc(75%-5px)] rounded-[3px] top-[1509px] w-[41px]" data-name="Choose / Large / Default">
      <div aria-hidden="true" className="absolute border border-[#c1c2c2] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Next() {
  return (
    <div className="absolute contents left-[calc(75%-5px)] top-[1509px]" data-name="Next">
      <ChooseLargeDefault />
      <div className="absolute left-[calc(75%+4px)] size-[24px] top-[1515px]" data-name="chevron_right_24px">
        <div className="absolute inset-[26.74%_36.28%]" data-name="icon/navigation/chevron_right_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.585 11.1663">
            <path d={svgPaths.pb76dc00} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/navigation/chevron_right_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChooseLargeDefault1() {
  return (
    <div className="h-[37px] opacity-50 relative rounded-[3px] w-[41px]" data-name="Choose / Large / Default">
      <div aria-hidden="true" className="absolute border border-[#c1c2c2] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function Prev() {
  return (
    <div className="absolute contents left-[calc(41.67%+28px)] top-[1509px]" data-name="Prev">
      <div className="absolute flex h-[37px] items-center justify-center left-[calc(41.67%+28px)] top-[1509px] w-[41px]">
        <div className="flex-none rotate-180">
          <ChooseLargeDefault1 />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[calc(41.67%+36px)] size-[24px] top-[1516px]">
        <div className="flex-none rotate-180">
          <div className="opacity-50 relative size-[24px]" data-name="chevron_right_24px">
            <div className="absolute inset-[26.74%_36.28%]" data-name="icon/navigation/chevron_right_24px">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.585 11.1663">
                <path d={svgPaths.pb76dc00} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/navigation/chevron_right_24px" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <div className="absolute contents left-[calc(41.67%+28px)] top-[1509px]" data-name="Pagination">
      <div className="absolute bg-[rgba(249,249,249,0.9)] content-stretch flex flex-col items-center left-[calc(41.67%+101px)] px-[16px] py-[8px] rounded-[12px] top-[1509px]" data-name="Choose / Large / Active">
        <div aria-hidden="true" className="absolute border border-[#3dcbb1] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="flex flex-col font-['Public_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3dcbb1] text-[14px] text-center whitespace-nowrap">
          <p className="leading-[21px]">1</p>
        </div>
      </div>
      <div className="absolute content-stretch flex items-center left-[calc(50%+27px)] px-[16px] py-[8px] rounded-[12px] top-[1509px]" data-name="Choose / Large / Default">
        <div aria-hidden="true" className="absolute border border-[rgba(27,27,27,0.6)] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="flex flex-col font-['Public_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(27,27,27,0.6)] text-center whitespace-nowrap">
          <p className="leading-[21px]">2</p>
        </div>
      </div>
      <div className="absolute content-stretch flex items-center left-[calc(50%+76px)] px-[16px] py-[8px] rounded-[12px] top-[1509px]" data-name="Choose / Large / Default">
        <div aria-hidden="true" className="absolute border border-[rgba(27,27,27,0.6)] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="flex flex-col font-['Public_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(27,27,27,0.6)] text-center whitespace-nowrap">
          <p className="leading-[21px]">3</p>
        </div>
      </div>
      <div className="absolute content-stretch flex items-center left-[calc(58.33%+5px)] px-[16px] py-[8px] rounded-[12px] top-[1509px]" data-name="Choose / Large / Default">
        <div aria-hidden="true" className="absolute border border-[rgba(27,27,27,0.6)] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="flex flex-col font-['Public_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(27,27,27,0.6)] text-center whitespace-nowrap">
          <p className="leading-[21px]">4</p>
        </div>
      </div>
      <div className="absolute content-stretch flex items-center left-[calc(58.33%+54px)] px-[16px] py-[8px] rounded-[12px] top-[1509px]" data-name="Choose / Large / Default">
        <div aria-hidden="true" className="absolute border border-[rgba(27,27,27,0.6)] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="flex flex-col font-['Public_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(27,27,27,0.6)] text-center whitespace-nowrap">
          <p className="leading-[21px]">5</p>
        </div>
      </div>
      <div className="absolute content-stretch flex items-center left-[calc(66.67%-17px)] px-[16px] py-[8px] rounded-[12px] top-[1509px]" data-name="Choose / Large / Default">
        <div aria-hidden="true" className="absolute border border-[rgba(27,27,27,0.6)] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="flex flex-col font-['Public_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(27,27,27,0.6)] text-center whitespace-nowrap">
          <p className="leading-[21px]">...</p>
        </div>
      </div>
      <div className="absolute content-stretch flex items-center left-[calc(66.67%+34px)] px-[16px] py-[8px] rounded-[12px] top-[1509px]" data-name="Choose / Large / Default">
        <div aria-hidden="true" className="absolute border border-[rgba(27,27,27,0.6)] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="flex flex-col font-['Public_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(27,27,27,0.6)] text-center whitespace-nowrap">
          <p className="leading-[21px]">98</p>
        </div>
      </div>
      <Next />
      <Prev />
    </div>
  );
}

function ChevronDown24Px() {
  return (
    <div className="relative size-[16px]" data-name="chevron_down_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron_down_24px">
          <path d={svgPaths.p135d1000} fill="var(--fill-0, #080E2F)" id="icon/navigation/chevron_down_24px" />
        </g>
      </svg>
    </div>
  );
}

function Software() {
  return (
    <div className="absolute contents left-[144px] top-[708px]" data-name="Software">
      <p className="absolute font-['Gilroy:Bold',sans-serif] leading-[21px] left-[144px] not-italic text-[14px] text-[rgba(27,27,27,0.9)] top-[708px] whitespace-nowrap">Software</p>
      <div className="absolute flex items-center justify-center right-[calc(75%-29px)] size-[16px] top-[711px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <ChevronDown24Px />
        </div>
      </div>
    </div>
  );
}

function ChevronDown24Px1() {
  return (
    <div className="relative size-[16px]" data-name="chevron_down_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron_down_24px">
          <path d={svgPaths.p135d1000} fill="var(--fill-0, #080E2F)" id="icon/navigation/chevron_down_24px" />
        </g>
      </svg>
    </div>
  );
}

function Language() {
  return (
    <div className="absolute contents left-[144px] top-[928px]" data-name="Language">
      <p className="absolute font-['Gilroy:Bold',sans-serif] leading-[21px] left-[144px] not-italic text-[14px] text-[rgba(27,27,27,0.9)] top-[928px] whitespace-nowrap">Language</p>
      <div className="absolute flex items-center justify-center right-[calc(75%-29px)] size-[16px] top-[931px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <ChevronDown24Px1 />
        </div>
      </div>
    </div>
  );
}

function Filter1() {
  return (
    <div className="absolute contents left-[144px] top-[108px] whitespace-nowrap" data-name="Filter">
      <p className="absolute font-['Gilroy:Bold',sans-serif] leading-[21px] left-[144px] not-italic text-[16px] text-black top-[108px]">Filter</p>
      <div className="absolute flex flex-col font-['Public_Sans:Regular',sans-serif] font-normal inset-[4.67%_73.26%_94.43%_24.31%] justify-center leading-[0] text-[#3dcbb1] text-[14px] text-center">
        <p className="leading-[21px]">Clear</p>
      </div>
    </div>
  );
}

function StarPurple50024Px() {
  return (
    <div className="absolute inset-[8.47%_87.22%_90.84%_11.67%]" data-name="star_purple500_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_purple500_24px">
          <path d={svgPaths.p8cfd400} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
        </g>
      </svg>
    </div>
  );
}

function StarPurple50024Px1() {
  return (
    <div className="absolute inset-[8.47%_85.97%_90.84%_12.92%]" data-name="star_purple500_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_purple500_24px">
          <path d={svgPaths.p8cfd400} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
        </g>
      </svg>
    </div>
  );
}

function StarPurple50024Px2() {
  return (
    <div className="absolute inset-[8.47%_84.72%_90.84%_14.17%]" data-name="star_purple500_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_purple500_24px">
          <path d={svgPaths.p8cfd400} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
        </g>
      </svg>
    </div>
  );
}

function StarPurple50024Px3() {
  return (
    <div className="absolute inset-[8.47%_83.47%_90.84%_15.42%]" data-name="star_purple500_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_purple500_24px">
          <path d={svgPaths.p8cfd400} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
        </g>
      </svg>
    </div>
  );
}

function StarHalf24Px() {
  return (
    <div className="absolute inset-[8.47%_82.22%_90.84%_16.67%]" data-name="star_half_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_half_24px">
          <path d={svgPaths.p3ed6b300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
        </g>
      </svg>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents inset-[8.47%_82.22%_90.84%_11.67%]">
      <StarPurple50024Px />
      <StarPurple50024Px1 />
      <StarPurple50024Px2 />
      <StarPurple50024Px3 />
      <StarHalf24Px />
    </div>
  );
}

function Rating13() {
  return (
    <div className="absolute contents inset-[8.42%_74.65%_90.8%_11.67%]" data-name="Rating">
      <Group12 />
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[8.42%_74.65%_90.8%_18.33%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">{`4.5 & up (5.8K)`}</p>
    </div>
  );
}

function StarPurple50024Px4() {
  return (
    <div className="absolute inset-[9.59%_87.22%_89.72%_11.67%]" data-name="star_purple500_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_purple500_24px">
          <path d={svgPaths.p8cfd400} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
        </g>
      </svg>
    </div>
  );
}

function StarPurple50024Px5() {
  return (
    <div className="absolute inset-[9.59%_85.97%_89.72%_12.92%]" data-name="star_purple500_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_purple500_24px">
          <path d={svgPaths.p8cfd400} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
        </g>
      </svg>
    </div>
  );
}

function StarPurple50024Px6() {
  return (
    <div className="absolute inset-[9.59%_84.72%_89.72%_14.17%]" data-name="star_purple500_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_purple500_24px">
          <path d={svgPaths.p8cfd400} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
        </g>
      </svg>
    </div>
  );
}

function StarHalf24Px1() {
  return (
    <div className="absolute inset-[9.59%_83.47%_89.72%_15.42%]" data-name="star_half_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_half_24px">
          <path d={svgPaths.p3ed6b300} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_half_24px" />
        </g>
      </svg>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[9.59%_83.47%_89.72%_11.67%]">
      <StarPurple50024Px4 />
      <StarPurple50024Px5 />
      <StarPurple50024Px6 />
      <StarHalf24Px1 />
    </div>
  );
}

function StarPurple50024Px7() {
  return (
    <div className="absolute inset-[10.71%_87.22%_88.6%_11.67%]" data-name="star_purple500_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_purple500_24px">
          <path d={svgPaths.p8cfd400} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
        </g>
      </svg>
    </div>
  );
}

function StarPurple50024Px8() {
  return (
    <div className="absolute inset-[10.71%_85.97%_88.6%_12.92%]" data-name="star_purple500_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_purple500_24px">
          <path d={svgPaths.p8cfd400} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
        </g>
      </svg>
    </div>
  );
}

function StarPurple50024Px9() {
  return (
    <div className="absolute inset-[10.71%_84.72%_88.6%_14.17%]" data-name="star_purple500_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star_purple500_24px">
          <path d={svgPaths.p8cfd400} fill="var(--fill-0, #FFD130)" id="icon/toggle/star_purple500_24px" />
        </g>
      </svg>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[10.71%_84.72%_88.6%_11.67%]">
      <StarPurple50024Px7 />
      <StarPurple50024Px8 />
      <StarPurple50024Px9 />
    </div>
  );
}

function ChevronUp24Px() {
  return (
    <div className="relative size-[16px]" data-name="chevron_up_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron_up_24px">
          <path d={svgPaths.p135d1000} fill="var(--fill-0, #080E2F)" id="icon/navigation/chevron_up_24px" />
        </g>
      </svg>
    </div>
  );
}

function Rating12() {
  return (
    <div className="absolute contents left-[144px] top-[162px]" data-name="Rating">
      <p className="absolute font-['Gilroy:Bold',sans-serif] leading-[21px] left-[144px] not-italic text-[14px] text-[rgba(27,27,27,0.9)] top-[162px] whitespace-nowrap">Rating</p>
      <Rating13 />
      <Group13 />
      <Group14 />
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[9.55%_74.86%_89.68%_18.33%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">{`3.5 & up (1.2K)`}</p>
      <p className="absolute bottom-[88.55%] font-['Gilroy:Regular',sans-serif] leading-[18px] left-[18.33%] not-italic right-3/4 text-[14px] text-[rgba(27,27,27,0.6)] top-[10.67%] whitespace-nowrap">{`3.0 & up (867)`}</p>
      <div className="absolute flex items-center justify-center right-[calc(75%-29px)] size-[16px] top-[165px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <ChevronUp24Px />
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[196px]" data-name="radio_button_checked_24px">
        <div className="absolute inset-[8.33%]" data-name="icon/toggle/radio_button_checked_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.333 13.333">
            <path d={svgPaths.p208a7b00} fill="var(--fill-0, #3DCBB1)" id="icon/toggle/radio_button_checked_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[222px]" data-name="radio_button_unchecked_24px">
        <div className="absolute inset-[8.33%]" data-name="icon/toggle/radio_button_unchecked_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.333 13.333">
            <path d={svgPaths.p2788a500} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/radio_button_unchecked_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[248px]" data-name="radio_button_unchecked_24px">
        <div className="absolute inset-[8.33%]" data-name="icon/toggle/radio_button_unchecked_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.333 13.333">
            <path d={svgPaths.p2788a500} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/radio_button_unchecked_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChevronUp24Px1() {
  return (
    <div className="relative size-[16px]" data-name="chevron_up_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron_up_24px">
          <path d={svgPaths.p135d1000} fill="var(--fill-0, #080E2F)" id="icon/navigation/chevron_up_24px" />
        </g>
      </svg>
    </div>
  );
}

function VideoDuration() {
  return (
    <div className="absolute contents left-[144px] top-[298px]" data-name="Video Duration">
      <p className="absolute font-['Gilroy:Bold',sans-serif] leading-[21px] left-[144px] not-italic text-[14px] text-[rgba(27,27,27,0.9)] top-[298px] whitespace-nowrap">Video Duration</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[14.47%_80.49%_84.75%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">0-2 Hours (9.4K)</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[15.59%_80.69%_83.63%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">3-5 Hours (4.1K)</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[16.72%_80.07%_82.51%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">6-12 Hours (3.8K)</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[17.84%_81.53%_81.38%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">12+ Hours (1K)</p>
      <div className="absolute flex items-center justify-center right-[calc(75%-29px)] size-[16px] top-[301px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <ChevronUp24Px1 />
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[336px]" data-name="check_box_outline_blank_24px">
        <div className="absolute inset-[12.5%]" data-name="icon/toggle/check_box_outline_blank_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p28dac990} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/check_box_outline_blank_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[362px]" data-name="check_box_24px">
        <div className="absolute inset-[12.5%]" data-name="icon/toggle/check_box_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p1cdc0280} fill="var(--fill-0, #3DCBB1)" id="icon/toggle/check_box_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[388px]" data-name="check_box_outline_blank_24px">
        <div className="absolute inset-[12.5%]" data-name="icon/toggle/check_box_outline_blank_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p28dac990} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/check_box_outline_blank_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[414px]" data-name="check_box_outline_blank_24px">
        <div className="absolute inset-[12.5%]" data-name="icon/toggle/check_box_outline_blank_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p28dac990} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/check_box_outline_blank_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChevronUp24Px2() {
  return (
    <div className="relative size-[16px]" data-name="chevron_up_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron_up_24px">
          <path d={svgPaths.p135d1000} fill="var(--fill-0, #080E2F)" id="icon/navigation/chevron_up_24px" />
        </g>
      </svg>
    </div>
  );
}

function Categories() {
  return (
    <div className="absolute contents left-[144px] top-[464px]" data-name="Categories">
      <p className="absolute font-['Gilroy:Bold',sans-serif] leading-[21px] left-[144px] not-italic text-[14px] text-[rgba(27,27,27,0.9)] top-[464px] whitespace-nowrap">Categories</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[21.64%_82.01%_77.58%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">Design (3.2K)</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[22.76%_79.17%_76.46%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">Programming (1.4K)</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[23.89%_75.56%_75.33%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">{`Business & Marketing (809)`}</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[27.26%_78.61%_71.97%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">{`Photo & Video (2.3K)`}</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[26.13%_79.51%_73.09%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">{`Music & Film (1.9K)`}</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[25.01%_81.88%_74.21%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">Finance (548)</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[28.38%_82.22%_70.84%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">Writing (753)</p>
      <div className="absolute flex items-center justify-center right-[calc(75%-29px)] size-[16px] top-[467px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <ChevronUp24Px2 />
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[502px]" data-name="check_box_24px">
        <div className="absolute inset-[12.5%]" data-name="icon/toggle/check_box_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p1cdc0280} fill="var(--fill-0, #3DCBB1)" id="icon/toggle/check_box_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[528px]" data-name="check_box_outline_blank_24px">
        <div className="absolute inset-[12.5%]" data-name="icon/toggle/check_box_outline_blank_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p28dac990} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/check_box_outline_blank_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[554px]" data-name="check_box_outline_blank_24px">
        <div className="absolute inset-[12.5%]" data-name="icon/toggle/check_box_outline_blank_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p28dac990} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/check_box_outline_blank_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[580px]" data-name="check_box_outline_blank_24px">
        <div className="absolute inset-[12.5%]" data-name="icon/toggle/check_box_outline_blank_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p28dac990} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/check_box_outline_blank_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[606px]" data-name="check_box_outline_blank_24px">
        <div className="absolute inset-[12.5%]" data-name="icon/toggle/check_box_outline_blank_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p28dac990} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/check_box_outline_blank_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[632px]" data-name="check_box_outline_blank_24px">
        <div className="absolute inset-[12.5%]" data-name="icon/toggle/check_box_outline_blank_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p28dac990} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/check_box_outline_blank_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[658px]" data-name="check_box_outline_blank_24px">
        <div className="absolute inset-[12.5%]" data-name="icon/toggle/check_box_outline_blank_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p28dac990} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/check_box_outline_blank_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ChevronUp24Px3() {
  return (
    <div className="relative size-[16px]" data-name="chevron_up_24px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="chevron_up_24px">
          <path d={svgPaths.p135d1000} fill="var(--fill-0, #080E2F)" id="icon/navigation/chevron_up_24px" />
        </g>
      </svg>
    </div>
  );
}

function Level() {
  return (
    <div className="absolute contents left-[144px] top-[762px]" data-name="Level">
      <p className="absolute font-['Gilroy:Bold',sans-serif] leading-[21px] left-[144px] not-italic text-[14px] text-[rgba(27,27,27,0.9)] top-[762px] whitespace-nowrap">Level</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[35.64%_84.24%_63.59%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">Beginner</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[36.76%_82.5%_62.46%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">Intermediate</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[37.88%_83.75%_61.34%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">Advanced</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[34.51%_83.96%_64.71%_11.67%] leading-[18px] not-italic text-[14px] text-[rgba(27,27,27,0.6)] whitespace-nowrap">All Levels</p>
      <div className="absolute flex items-center justify-center right-[calc(75%-29px)] size-[16px] top-[765px]" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <ChevronUp24Px3 />
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[800px]" data-name="radio_button_unchecked_24px">
        <div className="absolute inset-[8.33%]" data-name="icon/toggle/radio_button_unchecked_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.333 13.333">
            <path d={svgPaths.p2788a500} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/radio_button_unchecked_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[826px]" data-name="radio_button_checked_24px">
        <div className="absolute inset-[8.33%]" data-name="icon/toggle/radio_button_checked_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.333 13.333">
            <path d={svgPaths.p208a7b00} fill="var(--fill-0, #3DCBB1)" id="icon/toggle/radio_button_checked_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[852px]" data-name="radio_button_unchecked_24px">
        <div className="absolute inset-[8.33%]" data-name="icon/toggle/radio_button_unchecked_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.333 13.333">
            <path d={svgPaths.p2788a500} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/radio_button_unchecked_24px" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[144px] size-[16px] top-[878px]" data-name="radio_button_unchecked_24px">
        <div className="absolute inset-[8.33%]" data-name="icon/toggle/radio_button_unchecked_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.333 13.333">
            <path d={svgPaths.p2788a500} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/toggle/radio_button_unchecked_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Filter() {
  return (
    <div className="absolute contents left-[120px] top-[92px]" data-name="Filter">
      <div className="absolute bg-white h-[881px] left-[120px] rounded-[6px] shadow-[0px_6px_20px_0px_rgba(0,0,0,0.05)] top-[92px] w-[285px]" />
      <div className="absolute bg-[rgba(27,27,27,0.1)] h-px left-[120px] opacity-20 top-[145px] w-[285px]" data-name="Divider" />
      <div className="absolute bg-[rgba(27,27,27,0.1)] h-px left-[120px] opacity-20 top-[281px] w-[285px]" data-name="Divider" />
      <div className="absolute bg-[rgba(27,27,27,0.1)] h-px left-[120px] opacity-20 top-[447px] w-[285px]" data-name="Divider" />
      <div className="absolute bg-[rgba(27,27,27,0.1)] h-px left-[120px] opacity-20 top-[691px] w-[285px]" data-name="Divider" />
      <div className="absolute bg-[rgba(27,27,27,0.1)] h-px left-[120px] opacity-20 top-[911px] w-[285px]" data-name="Divider" />
      <div className="absolute bg-[rgba(27,27,27,0.1)] h-px left-[120px] opacity-20 top-[745px] w-[285px]" data-name="Divider" />
      <Software />
      <Language />
      <Filter1 />
      <Rating12 />
      <VideoDuration />
      <Categories />
      <Level />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute contents left-[120px] top-[92px]" data-name="Content">
      <CourseList />
      <ResultSort />
      <div className="absolute h-[307px] left-[120px] overflow-clip top-[1626px] w-[1200px]" data-name="Card / Promo / Advanced">
        <div className="absolute bg-[#1b283f] inset-0 rounded-[12px]" data-name="background" />
        <MaskGroup />
        <Title />
      </div>
      <Pagination />
      <Filter />
    </div>
  );
}

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
    <div className="absolute contents inset-[-136.42%_73.61%_229.47%_20.9%]" data-name="Browse">
      <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[-136.42%_75.42%_229.47%_20.9%] leading-[21px] not-italic text-[#1b1b1b] text-[16px] whitespace-nowrap">Browse</p>
      <div className="absolute inset-[-136.42%_73.61%_229.47%_24.93%]" data-name="expand_more_24px">
        <div className="absolute inset-[36.28%_26.72%]" data-name="icon/navigation/expand_more_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.77813 5.76186">
            <path d={svgPaths.p38d0ca00} fill="var(--fill-0, #1B1B1B)" id="icon/navigation/expand_more_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#3dcbb1] inset-[0_71.63%_0_0] overflow-clip rounded-[190px]">
      <div className="absolute bg-[#3dcbb1] left-[4.7px] rounded-[74.219px] size-[33.594px] top-[4.7px]" />
      <p className="absolute font-['Gilroy:Heavy',sans-serif] leading-[50.801px] left-[5.38px] not-italic text-[38.71px] text-white top-[4.7px] whitespace-nowrap">m</p>
    </div>
  );
}

function Browse1() {
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
      <p className="absolute font-['Gilroy:Regular',sans-serif] leading-[21px] left-[522px] not-italic text-[16px] text-[rgba(27,27,27,0.9)] top-[20px] whitespace-nowrap">UI Design</p>
      <div className="absolute right-[542px] size-[21px] top-[20px]" data-name="clear_24px">
        <div className="absolute inset-[22.53%]" data-name="icon/content/clear_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5369 11.5369">
            <path d={svgPaths.p29e74100} fill="var(--fill-0, #080E2F)" id="icon/content/clear_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MaskGroup1() {
  return (
    <div className="absolute contents right-[120px] top-[12px]" data-name="Mask Group">
      <div className="absolute mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[36px_36px] right-[120px] rounded-[15px] size-[36px] top-[12px]" data-name="General / Image / Square" style={{ maskImage: `url('${imgGeneralImageSquare}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[15px] size-full" src={imgGeneralImageSquare1} />
      </div>
    </div>
  );
}

export default function Search1() {
  return (
    <div className="bg-white relative size-full" data-name="Search - 1">
      <Content />
      <div className="absolute bottom-0 h-[302px] left-0 overflow-clip w-[1440px]" data-name="Footer">
        <div className="absolute bg-[#1b1b1b] inset-0" data-name="Container" />
        <div className="absolute h-[43px] left-[105px] top-[40px] w-[151.592px]" data-name="Logo">
          <Frame />
          <p className="absolute font-['Gilroy:ExtraBold',sans-serif] inset-[22.85%_-0.03%_22.41%_32.85%] leading-[23.343px] not-italic text-[17.79px] text-white whitespace-nowrap">MyCourse.io</p>
        </div>
        <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[85.1%_66.18%_7.95%_8.33%] leading-[21px] not-italic text-[16px] text-[rgba(249,249,249,0.6)] whitespace-nowrap">Copyright © MyCourse.io 2026. All Rights Reserved</p>
        <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[13.25%_60.97%_79.8%_29.51%] leading-[21px] not-italic text-[16px] text-white whitespace-nowrap">Web Programming</p>
        <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[25.5%_60%_67.55%_29.51%] leading-[21px] not-italic text-[16px] text-white whitespace-nowrap">Mobile Programming</p>
        <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[37.75%_63.13%_55.3%_29.51%] leading-[21px] not-italic text-[16px] text-white whitespace-nowrap">Java Beginner</p>
        <p className="absolute bottom-[43.05%] font-['Gilroy:Regular',sans-serif] leading-[21px] left-[29.51%] not-italic right-[63.61%] text-[16px] text-white top-1/2 whitespace-nowrap">PHP Beginner</p>
        <div className="absolute bg-[rgba(249,249,249,0.9)] inset-[76.82%_8.33%_22.85%_8.33%] opacity-8" />
        <div className="absolute inset-[84.77%_11.67%_7.28%_86.67%] overflow-clip" data-name="Social/Instagram">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d={svgPaths.p1f273600} fill="var(--fill-0, #F9F9F9)" fillOpacity="0.6" id="Union" />
          </svg>
        </div>
        <div className="absolute inset-[84.77%_8.33%_7.28%_90%] overflow-clip" data-name="Social/Facebook">
          <div className="absolute bottom-0 left-1/4 right-1/4 top-0" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 24">
              <path d={svgPaths.p2c9fba00} fill="var(--fill-0, #F9F9F9)" fillOpacity="0.6" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[84.77%_15%_7.28%_83.33%] overflow-clip" data-name="Social/Twitter">
          <div className="absolute inset-[9.38%_0]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 19.5">
              <path d={svgPaths.p1e239d00} fill="var(--fill-0, #F9F9F9)" fillOpacity="0.6" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[13.25%_40.9%_79.8%_50.69%] leading-[21px] not-italic text-[16px] text-white whitespace-nowrap">Adobe Illustrator</p>
        <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[13.25%_20.63%_79.8%_71.88%] leading-[21px] not-italic text-[16px] text-white whitespace-nowrap">Writing Course</p>
        <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[25.5%_40.07%_67.55%_50.69%] leading-[21px] not-italic text-[16px] text-white whitespace-nowrap">Adobe Photoshop</p>
        <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[25.5%_21.46%_67.55%_71.88%] leading-[21px] not-italic text-[16px] text-white whitespace-nowrap">Photography</p>
        <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[37.75%_42.92%_55.3%_50.69%] leading-[21px] not-italic text-[16px] text-white whitespace-nowrap">Design Logo</p>
        <Browse />
        <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[37.75%_21.18%_55.3%_71.88%] leading-[21px] not-italic text-[16px] text-white whitespace-nowrap">Video Making</p>
      </div>
      <div className="absolute h-[60px] left-0 top-0 w-[1440px]" data-name="Navbar / Light / Logged In">
        <div className="absolute bg-white inset-0 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" data-name="Container" />
        <div className="absolute h-[43px] left-[105px] top-[9px] w-[151.592px]" data-name="Logo">
          <Frame1 />
          <p className="absolute font-['Gilroy:ExtraBold',sans-serif] inset-[22.85%_-0.03%_22.41%_32.85%] leading-[23.343px] not-italic text-[17.79px] text-black whitespace-nowrap">MyCourse.io</p>
        </div>
        <Browse1 />
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
        <MaskGroup1 />
      </div>
    </div>
  );
}