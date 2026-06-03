import svgPaths from "./svg-8ln60iz32t";
import imgPlaceholder2 from "figma:asset/883c3621f8d0210dd12f5ceeeb8ae853069ff8c1.png";
import imgPlaceholder3 from "figma:asset/4dc91226f2650929b2f3ab4a9e2be713eb47844a.png";
import imgPlaceholder4 from "figma:asset/5fd8413c744e0769a2127361fb7ae30f5fcf6e5a.png";
import imgScreenShot20200728At15032 from "figma:asset/dfa28a47ed582c48f752452379b5847de8951bf0.png";
import imgPlaceholder6 from "figma:asset/fdd561b63010c55a0a03db39cc7396de5669f4ce.png";
import imgEllipse8 from "figma:asset/617a8da7d2026b85917c372451e313f2ed20da81.png";
import { imgPlaceholder1, imgScreenShot20200728At15031, imgPlaceholder5 } from "./svg-6dnjl";

function Title() {
  return (
    <div className="absolute contents left-[120px] not-italic top-[648px]" data-name="Title">
      <p className="absolute font-['Gilroy:Bold',sans-serif] leading-[26px] left-[120px] text-[20px] text-black top-[648px] whitespace-nowrap">Complete your Course</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] leading-[24px] left-[120px] text-[16px] text-[rgba(27,27,27,0.6)] top-[678px] whitespace-pre">{`We know the best things for You.  Top picks for You.`}</p>
    </div>
  );
}

function Thumbnail() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder2} />
      </div>
    </div>
  );
}

function Seekbar() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[157px] place-items-start relative row-1" data-name="Seekbar">
      <div className="bg-[rgba(249,249,249,0.9)] col-1 h-[4px] ml-0 mt-0 rounded-[23px] row-1 w-[285px]" data-name="default" />
      <div className="bg-[#3dcbb1] col-1 h-[4px] ml-0 mt-0 rounded-[23px] row-1 w-[120px]" data-name="active" />
    </div>
  );
}

function ThumbnailImage() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail />
      <Seekbar />
      <div className="col-1 ml-[253px] mt-[8px] relative row-1 size-[24px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 5" opacity="0.4" r="12" />
        </svg>
      </div>
      <div className="col-1 ml-[257px] mt-[12px] relative rounded-[23px] row-1 size-[16px]" data-name="more_vert_24px">
        <div className="absolute inset-[16.67%_41.67%]" data-name="icon/navigation/more_vert_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66699 10.667">
            <path d={svgPaths.p7c2ec80} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/navigation/more_vert_24px" />
          </svg>
        </div>
      </div>
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

function Thumbnail1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder3} />
      </div>
    </div>
  );
}

function Seekbar1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[157px] place-items-start relative row-1" data-name="Seekbar">
      <div className="bg-[rgba(249,249,249,0.9)] col-1 h-[4px] ml-0 mt-0 rounded-[23px] row-1 w-[285px]" data-name="default" />
      <div className="bg-[#3dcbb1] col-1 h-[4px] ml-0 mt-0 rounded-[23px] row-1 w-[120px]" data-name="active" />
    </div>
  );
}

function ThumbnailImage1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail1 />
      <Seekbar1 />
      <div className="col-1 ml-[253px] mt-[8px] relative row-1 size-[24px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 5" opacity="0.4" r="12" />
        </svg>
      </div>
      <div className="col-1 ml-[257px] mt-[12px] relative rounded-[23px] row-1 size-[16px]" data-name="more_vert_24px">
        <div className="absolute inset-[16.67%_41.67%]" data-name="icon/navigation/more_vert_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66699 10.667">
            <path d={svgPaths.p7c2ec80} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/navigation/more_vert_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Instructor1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">Ghoniyyu Maulidi</p>
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

function Thumbnail2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Thumbnail">
      <div className="col-1 h-[161px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[285px_161px] ml-0 mt-0 relative rounded-[23px] row-1 w-[285px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder1}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[23px] size-full" src={imgPlaceholder4} />
      </div>
    </div>
  );
}

function Seekbar2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-[157px] place-items-start relative row-1" data-name="Seekbar">
      <div className="bg-[rgba(249,249,249,0.9)] col-1 h-[4px] ml-0 mt-0 rounded-[23px] row-1 w-[285px]" data-name="default" />
      <div className="bg-[#3dcbb1] col-1 h-[4px] ml-0 mt-0 rounded-[23px] row-1 w-[120px]" data-name="active" />
    </div>
  );
}

function ThumbnailImage2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Thumbnail-Image">
      <Thumbnail2 />
      <Seekbar2 />
      <div className="col-1 ml-[253px] mt-[8px] relative row-1 size-[24px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 5" opacity="0.4" r="12" />
        </svg>
      </div>
      <div className="col-1 ml-[257px] mt-[12px] relative rounded-[23px] row-1 size-[16px]" data-name="more_vert_24px">
        <div className="absolute inset-[16.67%_41.67%]" data-name="icon/navigation/more_vert_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66699 10.667">
            <path d={svgPaths.p7c2ec80} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.6" id="icon/navigation/more_vert_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Instructor2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Instructor">
      <p className="col-1 font-['Gilroy:Regular',sans-serif] leading-[18px] ml-[22px] mt-0 not-italic relative row-1 text-[#3dcbb1] text-[14px] w-[263px]">Alvin Fidiarta</p>
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

function Cards() {
  return (
    <div className="absolute contents left-[120px] top-[722px]" data-name="Cards">
      <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-[120px] top-[722px]" data-name="Card / Continue Watch">
        <ThumbnailImage />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px]">Java Programming Beginner</p>
        <Instructor />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">4/10 Videos Completed</p>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-[calc(50%+10px)] top-[722px]" data-name="Card / Continue Watch">
        <ThumbnailImage1 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px]">Wordpress Course Intermediate</p>
        <Instructor1 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">3/8 Videos Completed</p>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-[calc(25%+65px)] top-[722px]" data-name="Card / Continue Watch">
        <ThumbnailImage2 />
        <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-black w-[285px]">{`iOS 13 & Swift 5 - Complete iOS...`}</p>
        <Instructor2 />
        <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-[rgba(27,27,27,0.9)] w-[285px]">12/40 Videos Completed</p>
      </div>
    </div>
  );
}

function ContinueWatching() {
  return (
    <div className="absolute contents left-[120px] top-[648px]" data-name="Continue Watching">
      <Title />
      <Cards />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Text">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#3dcbb1] text-[20px] whitespace-nowrap">Browse Course</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Text">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[26px] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap">Start make your account</p>
    </div>
  );
}

function Hero() {
  return (
    <div className="absolute contents left-0 top-[-52px]" data-name="Hero">
      <div className="absolute bg-[#f4d876] h-[660px] left-0 right-0 top-[-52px]" data-name="Container" />
      <div className="absolute h-[526px] left-[calc(50%+44px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-90.74%_-108px] mask-size-[171.02%_600px] right-[-166px] rounded-[8px] top-[116px]" data-name="Screen Shot 2020-07-28 at 15.03 1" style={{ maskImage: `url('${imgScreenShot20200728At15031}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgScreenShot20200728At15032} />
      </div>
      <p className="absolute font-['Gilroy:Bold',sans-serif] leading-[62px] left-[120px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-120px_-179px] mask-size-[1440px_600px] not-italic text-[48px] text-black top-[187px] w-[590px]" style={{ maskImage: `url('${imgScreenShot20200728At15031}')` }}>
        Learn something new everyday.
      </p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] leading-[36px] left-[120px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-120px_-311px] mask-size-[1440px_600px] not-italic text-[24px] text-[rgba(27,27,27,0.6)] top-[319px] w-[590px]" style={{ maskImage: `url('${imgScreenShot20200728At15031}')` }}>
        Become professionals and ready to join the world.
      </p>
      <div className="absolute bg-white content-stretch flex flex-col items-center left-[120px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-120px_-371px] mask-size-[1440px_600px] overflow-clip px-[24px] py-[12px] rounded-[18px] top-[379px]" data-name="Primary / Large / Enabled" style={{ maskImage: `url('${imgScreenShot20200728At15031}')` }}>
        <Text />
      </div>
      <div className="absolute bg-[#3dcbb1] content-stretch flex flex-col items-center left-[calc(16.67%+96px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-336px_-371px] mask-size-[1440px_600px] overflow-clip px-[24px] py-[12px] rounded-[18px] top-[379px]" data-name="Primary / Large / Enabled" style={{ maskImage: `url('${imgScreenShot20200728At15031}')` }}>
        <Text1 />
      </div>
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

function Search() {
  return (
    <div className="absolute contents left-[35.42%] right-[36.81%] top-[12px]" data-name="Search">
      <div className="absolute bg-[rgba(249,249,249,0.9)] h-[37px] left-[510px] right-[530px] rounded-[3px] top-[12px]" />
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

function Text2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Text">
      <div className="relative shrink-0 size-[16px]" data-name="timelapse_24px">
        <div className="absolute inset-[8.33%]" data-name="icon/image/timelapse_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.333 13.333">
            <path d={svgPaths.p46aa80} fill="var(--fill-0, white)" id="icon/image/timelapse_24px" />
          </svg>
        </div>
      </div>
      <p className="font-['Gilroy:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">Sign Up</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Text">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(27,27,27,0.9)] whitespace-nowrap">Login</p>
    </div>
  );
}

function Content() {
  return (
    <div className="absolute contents left-0 top-[-52px]" data-name="Content">
      <ContinueWatching />
      <Hero />
      <div className="absolute h-[60px] left-0 top-0 w-[1440px]" data-name="Navbar / Light / Default">
        <div className="absolute bg-white inset-0 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]" data-name="Container" />
        <div className="absolute h-[43px] left-[118px] top-[8px] w-[151.592px]" data-name="Logo">
          <Frame />
          <p className="absolute font-['Gilroy:ExtraBold',sans-serif] inset-[22.85%_-0.03%_22.41%_32.85%] leading-[23.343px] not-italic text-[17.79px] text-black whitespace-nowrap">MyCourse.io</p>
        </div>
        <p className="absolute font-['Gilroy:Regular',sans-serif] inset-[33.33%_25.49%_31.67%_65.21%] leading-[21px] not-italic text-[#1b1b1b] text-[16px] whitespace-nowrap">Become Instructor</p>
        <Search />
        <div className="absolute inset-[30%_22.29%_30%_76.04%]" data-name="shopping_cart_24px">
          <div className="absolute inset-[8.33%_8.32%]" data-name="icon/action/shopping_cart_24px">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0073 20">
              <path d={svgPaths.p2e2adb00} fill="var(--fill-0, #1B1B1B)" id="icon/action/shopping_cart_24px" />
            </svg>
          </div>
        </div>
        <div className="absolute bg-[#3dcbb1] content-stretch flex flex-col inset-[23.33%_8.33%_23.33%_84.51%] items-center overflow-clip px-[16px] py-[8px] rounded-[12px]" data-name="Primary / Small / Enabled">
          <Text2 />
        </div>
        <div className="absolute inset-[23.33%_16.6%_23.33%_78.82%] rounded-[12px]" data-name="Outline / Small / Enabled">
          <div className="content-stretch flex flex-col items-center overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
            <Text3 />
          </div>
          <div aria-hidden="true" className="absolute border border-[rgba(27,27,27,0.9)] border-solid inset-0 pointer-events-none rounded-[12px]" />
        </div>
      </div>
    </div>
  );
}

function SignUp() {
  return (
    <div className="absolute content-stretch flex gap-[2px] items-center left-[calc(58.33%-18px)] not-italic text-center top-[683px] whitespace-nowrap" data-name="SignUp">
      <p className="font-['Gilroy:Regular',sans-serif] leading-[18px] relative shrink-0 text-[14px] text-[rgba(27,27,27,0.6)]">Already have an Account?</p>
      <p className="font-['Gilroy:Bold',sans-serif] leading-[16px] relative shrink-0 text-[#3dcbb1] text-[12px]">Sign Up</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#3dcbb1] inset-[0_71.63%_0_0] overflow-clip rounded-[190px]">
      <div className="absolute bg-[#3dcbb1] left-[3.72px] rounded-[74.219px] size-[26.562px] top-[3.72px]" />
      <p className="absolute font-['Gilroy:Heavy',sans-serif] leading-[40.168px] left-[4.25px] not-italic text-[30.6px] text-white top-[3.72px] whitespace-nowrap">m</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[calc(50%+24px)] top-[512px]">
      <div className="absolute bg-[rgba(249,249,249,0.9)] h-[41px] left-[calc(50%+24px)] rounded-[3px] top-[512px] w-[352px]" />
      <p className="absolute font-['Gilroy:Regular',sans-serif] leading-[21px] left-[calc(50%+36px)] not-italic text-[16px] text-[rgba(27,27,27,0.1)] top-[522px] whitespace-nowrap">Email Address</p>
      <div className="absolute left-[calc(75%-17px)] rounded-[3px] size-[21px] top-[522px]" data-name="search_24px">
        <div className="absolute inset-[14.46%_14.49%_14.46%_14.48%]" data-name="icon/action/search_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9168 14.9256">
            <path d={svgPaths.p36d31d00} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/action/search_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[calc(50%+24px)] top-[561px]">
      <div className="absolute bg-[rgba(249,249,249,0.9)] h-[41px] left-[calc(50%+24px)] rounded-[3px] top-[561px] w-[352px]" />
      <p className="absolute font-['Gilroy:Regular',sans-serif] leading-[21px] left-[calc(50%+36px)] not-italic text-[16px] text-[rgba(27,27,27,0.1)] top-[571px] whitespace-nowrap">Password</p>
      <div className="absolute left-[calc(75%-17px)] rounded-[3px] size-[21px] top-[571px]" data-name="search_24px">
        <div className="absolute inset-[14.46%_14.49%_14.46%_14.48%]" data-name="icon/action/search_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9168 14.9256">
            <path d={svgPaths.p36d31d00} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.1" id="icon/action/search_24px" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Text">
      <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Create Account</p>
    </div>
  );
}

function ManualLogin() {
  return (
    <div className="absolute contents left-[calc(50%+24px)] top-[512px]" data-name="Manual Login">
      <Group1 />
      <Group5 />
      <div className="absolute bg-[#3dcbb1] content-stretch flex flex-col items-center left-[calc(50%+24px)] overflow-clip px-[18px] py-[10px] rounded-[14px] top-[618px] w-[352px]" data-name="Primary / Medium / Enabled">
        <Text4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Text">
      <div className="overflow-clip relative shrink-0 size-[21px]" data-name="Social/Facebook">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
          <path d={svgPaths.p4cdb080} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Sign Up with Facebook</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute bottom-[12.11%] left-1/2 right-[2%] top-[40.91%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.08 9.86523">
        <g id="Group 17">
          <mask height="10" id="mask0_4_1133" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="11" x="0" y="0">
            <g id="mask 2">
              <path d={svgPaths.p1dfa4ef0} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </mask>
          <g mask="url(#mask0_4_1133)">
            <path clipRule="evenodd" d={svgPaths.p3cc77d00} fill="var(--fill-0, #5070A8)" fillRule="evenodd" id="Fill 15" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[59.5%_16.91%_0_5.32%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.3322 8.50504">
        <g id="Group 20">
          <mask height="9" id="mask0_4_1115" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="17" x="0" y="0">
            <g id="mask 4">
              <path d={svgPaths.p3292c000} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </mask>
          <g mask="url(#mask0_4_1115)">
            <path clipRule="evenodd" d={svgPaths.p38006b00} fill="var(--fill-0, #2F9E4F)" fillRule="evenodd" id="Fill 18" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[27.55%_77.98%_27.55%_0]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.62477 9.43087">
        <g id="Group 23">
          <mask height="10" id="mask0_4_1144" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="5" x="0" y="0">
            <g id="mask 6">
              <path d={svgPaths.pb596f80} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </mask>
          <g mask="url(#mask0_4_1144)">
            <path clipRule="evenodd" d={svgPaths.p258f0580} fill="var(--fill-0, #EFB529)" fillRule="evenodd" id="Fill 21" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[0_16.55%_59.5%_5.32%]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4086 8.50498">
        <g id="Group 26">
          <mask height="9" id="mask0_4_1103" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="17" x="0" y="0">
            <g id="mask 8">
              <path d={svgPaths.p338bf5f0} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </mask>
          <g mask="url(#mask0_4_1103)">
            <path clipRule="evenodd" d={svgPaths.p2c3f5dc0} fill="var(--fill-0, #D53E36)" fillRule="evenodd" id="Fill 24" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Google() {
  return (
    <div className="absolute contents inset-[0_2%_0_0]" data-name="google">
      <Group />
      <Group2 />
      <Group3 />
      <Group4 />
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Text">
      <div className="overflow-clip relative shrink-0 size-[21px]" data-name="Social/Google">
        <Google />
      </div>
      <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#1b1b1b] text-[16px] whitespace-nowrap">Sign Up with Google</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="Text">
      <div className="overflow-clip relative shrink-0 size-[21px]" data-name="Social/Apple">
        <div className="absolute inset-[0_9.24%_0_12.5%]" data-name="Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4348 21">
            <path d={svgPaths.p32fae700} fill="var(--fill-0, white)" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="font-['Gilroy:Bold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Sign Up with Apple</p>
    </div>
  );
}

function Sso() {
  return (
    <div className="absolute contents left-[calc(50%+24px)] top-[323px]" data-name="SSO">
      <div className="absolute bg-[#4267b2] content-stretch flex flex-col items-center left-[calc(50%+24px)] overflow-clip px-[18px] py-[10px] rounded-[14px] top-[323px] w-[352px]" data-name="Primary / Medium / Enabled">
        <Text5 />
      </div>
      <div className="absolute left-[calc(50%+24px)] rounded-[14px] top-[421px] w-[352px]" data-name="Outline / Medium / Enabled">
        <div className="content-stretch flex flex-col items-center overflow-clip px-[18px] py-[10px] relative rounded-[inherit] w-full">
          <Text6 />
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(27,27,27,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      </div>
      <div className="absolute bg-[#1b1b1b] content-stretch flex flex-col items-center left-[calc(50%+24px)] overflow-clip px-[18px] py-[10px] rounded-[14px] top-[372px] w-[352px]" data-name="Primary / Medium / Enabled">
        <Text7 />
      </div>
    </div>
  );
}

function LoginModal() {
  return (
    <div className="absolute contents left-1/2 top-[175px]" data-name="Login-Modal">
      <div className="absolute bg-white h-[550px] left-1/2 rounded-br-[6px] rounded-tr-[8px] top-[175px] w-[400px]" data-name="Modal-Container" />
      <div className="absolute left-[calc(75%+12px)] size-[16px] top-[187px]" data-name="close_24px">
        <div className="absolute inset-[22.53%]" data-name="icon/navigation/close_24px">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.79 8.78999">
            <path d={svgPaths.p2ad800c0} fill="var(--fill-0, #1B1B1B)" fillOpacity="0.9" id="icon/navigation/close_24px" />
          </svg>
        </div>
      </div>
      <p className="-translate-x-1/2 absolute font-['Gilroy:Regular',sans-serif] leading-[18px] left-[calc(58.33%+80px)] not-italic text-[14px] text-black text-center top-[478px] whitespace-nowrap">or you can</p>
      <SignUp />
      <p className="absolute font-['Gilroy:Regular',sans-serif] leading-[24px] left-[calc(50%+24px)] not-italic text-[16px] text-[rgba(27,27,27,0.6)] top-[251px] w-[352px]">{`Join us and get more benefits. We promise to keep your data safely. `}</p>
      <div className="absolute h-[34px] left-[calc(50%+24px)] top-[203px] w-[119.863px]" data-name="Logo">
        <Frame1 />
        <p className="absolute font-['Gilroy:ExtraBold',sans-serif] inset-[22.85%_-0.03%_22.41%_32.85%] leading-[18.457px] not-italic text-[14.06px] text-black whitespace-nowrap">MyCourse.io</p>
      </div>
      <ManualLogin />
      <Sso />
    </div>
  );
}

function Thumbnail3() {
  return (
    <div className="absolute contents left-[22.22%] right-1/2 top-[175px]" data-name="Thumbnail">
      <div className="absolute h-[550px] left-[22.22%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[400px_550px] right-1/2 rounded-bl-[8px] rounded-tl-[8px] top-[175px]" data-name="Placeholder 1" style={{ maskImage: `url('${imgPlaceholder5}')` }}>
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-bl-[8px] rounded-tl-[8px] size-full" src={imgPlaceholder6} />
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[calc(16.67%+104px)] top-[660px]">
      <div className="absolute left-[calc(16.67%+104px)] size-[40px] top-[660px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, white)" id="Container" r="20" />
        </svg>
      </div>
      <div className="absolute left-[calc(16.67%+106.5px)] size-[35px] top-[662.5px]">
        <img alt="" className="absolute block max-w-none size-full" height="35" src={imgEllipse8} width="35" />
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[calc(16.67%+152px)] not-italic top-[659px] whitespace-nowrap">
      <p className="absolute font-['Gilroy:Bold',sans-serif] leading-[21px] left-[calc(16.67%+152px)] text-[16px] text-white top-[659px]">Joe Kitanoe</p>
      <p className="absolute font-['Gilroy:Regular',sans-serif] leading-[18px] left-[calc(16.67%+152px)] text-[14px] text-[rgba(249,249,249,0.6)] top-[680px]">Software Developer</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[calc(16.67%+104px)] top-[659px]">
      <Group6 />
      <Group8 />
    </div>
  );
}

function Overlay() {
  return (
    <div className="absolute contents left-[calc(16.67%+80px)] top-[622px]" data-name="Overlay">
      <div className="absolute bg-gradient-to-t from-[34.314%] from-[rgba(0,0,0,0.39)] h-[102px] left-[calc(16.67%+80px)] rounded-bl-[8px] rounded-tl-[8px] to-[rgba(0,0,0,0)] top-[622px] w-[400px]" data-name="overlay" />
      <Group7 />
    </div>
  );
}

function Modal() {
  return (
    <div className="absolute contents left-[calc(16.67%+80px)] top-[175px]" data-name="Modal">
      <LoginModal />
      <Thumbnail3 />
      <Overlay />
    </div>
  );
}

export default function SignUp1() {
  return (
    <div className="bg-white relative size-full" data-name="SignUp - 1">
      <Content />
      <div className="absolute h-[900px] left-0 top-0 w-[1440px]" data-name="Overlay">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <path d="M0 0H1440V900H0V0Z" fill="var(--fill-0, #1B1B1B)" id="Overlay" opacity="0.6" />
        </svg>
      </div>
      <Modal />
    </div>
  );
}