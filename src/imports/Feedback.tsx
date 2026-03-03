import svgPaths from "./svg-htj6n9r419";
import imgFeedback from "figma:asset/7850f91201840d11465ee9d7c0fcafe2717b64a8.png";

function Flag1() {
  return (
    <div className="absolute inset-[0_16.64%_0_17.19%]" data-name="flag">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55.5882 84">
        <g clipPath="url(#clip0_333_15613)" id="flag">
          <path d={svgPaths.p30718800} fill="var(--fill-0, #AA68FF)" id="vector" />
          <path d={svgPaths.pbaaa70} fill="var(--fill-0, #AA68FF)" id="vector_2" />
          <path d={svgPaths.p3c34fe00} fill="var(--fill-0, #820AD1)" id="vector_3" />
          <g id="mask group">
            <mask height="37" id="mask0_333_15613" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="31" x="25" y="0">
              <path d={svgPaths.p30718800} fill="url(#paint0_linear_333_15613)" id="vector_4" />
            </mask>
            <g mask="url(#mask0_333_15613)">
              <path d={svgPaths.p30718800} fill="var(--fill-0, #CEBAF4)" id="vector_5" />
            </g>
          </g>
          <path d={svgPaths.pff1fa00} fill="var(--fill-0, #820AD1)" id="vector_6" opacity="0.8" />
          <g id="mask group_2">
            <mask height="39" id="mask1_333_15613" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="31" x="0" y="5">
              <path d={svgPaths.pbaaa70} fill="url(#paint1_linear_333_15613)" id="vector_7" />
            </mask>
            <g mask="url(#mask1_333_15613)">
              <path d={svgPaths.pbaaa70} fill="var(--fill-0, #CEBAF4)" id="vector_8" />
            </g>
          </g>
          <path d={svgPaths.p2c157e00} fill="var(--fill-0, #AA68FF)" id="vector_9" opacity="0.8" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_333_15613" x1="25.163" x2="55.2239" y1="18.2206" y2="18.2206">
            <stop />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_333_15613" x1="0.364469" x2="30.5427" y1="24.2797" y2="24.2797">
            <stop />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <clipPath id="clip0_333_15613">
            <rect fill="white" height="84" width="55.5882" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Illustration() {
  return (
    <div className="absolute contents inset-[0_16.64%_0_17.19%]" data-name="Illustration">
      <Flag1 />
    </div>
  );
}

function Flag() {
  return (
    <div className="relative shrink-0 size-[84px]" data-name="Flag">
      <Illustration />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <Flag />
    </div>
  );
}

function TitleDescription() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 text-center w-full whitespace-pre-wrap" data-name="Title + Description">
      <div className="flex flex-col font-['Nu_Sans_Display:Medium',sans-serif] justify-center leading-[1.2] relative shrink-0 text-[28px] text-[rgba(0,0,0,0.96)] w-full">
        <p className="mb-0">{`One last `}</p>
        <p>step to finish</p>
      </div>
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[1.5] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.64)] w-full">
        <p className="mb-0">{`Your plan is ready. `}</p>
        <p>Secure these conditions by paying the first installment by June 16th.</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#820ad1] h-[48px] max-h-[48px] max-w-[359px] min-h-[48px] relative rounded-[64px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] px-[24px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] max-w-[295px] not-italic overflow-hidden relative shrink-0 text-[16px] text-center text-ellipsis text-white whitespace-nowrap">
            <p className="leading-[1.3] overflow-hidden">Make first payment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#efefef] h-[48px] max-h-[48px] max-w-[359px] min-h-[48px] relative rounded-[64px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] px-[24px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] max-w-[295px] not-italic overflow-hidden relative shrink-0 text-[16px] text-[rgba(0,0,0,0.96)] text-center text-ellipsis whitespace-nowrap">
            <p className="leading-[1.3] overflow-hidden">Do it later</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Button />
      <Button1 />
    </div>
  );
}

function Bottom() {
  return (
    <div className="bg-white relative rounded-[24px] shadow-[0px_1px_0px_0px_#e5e0e8] shrink-0 w-full" data-name="Bottom">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
        <Frame />
        <TitleDescription />
        <Frame1 />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Status Bar">
      <div className="content-stretch flex items-start justify-between pb-[10px] pl-[32px] pr-[24px] pt-[18px] size-full" />
    </div>
  );
}

function Trailing() {
  return <div className="-translate-y-1/2 absolute content-stretch flex items-center overflow-clip right-[10px] top-1/2" data-name="Trailing" />;
}

function Title() {
  return <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[8px] h-[22px] items-center justify-center left-[calc(50%-0.5px)] max-w-[223px] top-1/2" data-name="Title" />;
}

function MagicOutlinedUiActionsNavigationClose() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="[Magic] outlined/ui actions/navigation/close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="[Magic] outlined/ui actions/navigation/close">
          <path d={svgPaths.p15d88280} fill="var(--fill-0, #1F0230)" fillOpacity="0.62" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function IconAction() {
  return (
    <div className="bg-[rgba(255,255,255,0.3)] content-stretch flex items-center justify-center relative rounded-[64px] shrink-0 size-[32px]" data-name="Icon Action">
      <MagicOutlinedUiActionsNavigationClose />
    </div>
  );
}

function MagicIconAction() {
  return (
    <div className="content-stretch flex items-center justify-center max-h-[48px] max-w-[48px] min-h-[48px] min-w-[48px] relative rounded-[64px] shrink-0" data-name="[Magic] Icon Action">
      <IconAction />
    </div>
  );
}

function TouchTarget() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[44px]" data-name="Touch Target">
      <MagicIconAction />
    </div>
  );
}

function Leading() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-center left-[10px] overflow-clip size-[44px] top-1/2" data-name="Leading">
      <TouchTarget />
    </div>
  );
}

function TopBar() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Top Bar">
      <Trailing />
      <Title />
      <Leading />
    </div>
  );
}

function MagicTopBar() {
  return (
    <div className="content-stretch flex flex-col items-center relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-[375px]" data-name="[Magic] Top Bar">
      <StatusBar />
      <TopBar />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 top-0 w-[375px]" data-name="Header">
      <MagicTopBar />
    </div>
  );
}

export default function Feedback() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end overflow-clip p-[16px] relative rounded-[40px] size-full" data-name="Feedback">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[40px]">
        <div className="absolute bg-[#bab8ff] inset-0 rounded-[40px]" />
        <img alt="" className="absolute max-w-none object-cover rounded-[40px] size-full" src={imgFeedback} />
      </div>
      <Bottom />
      <Header />
    </div>
  );
}