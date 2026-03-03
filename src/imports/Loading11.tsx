import svgPaths from "./svg-osjlv45m9o";

function TimeWrapper() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Time Wrapper">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white tracking-[-0.24px] whitespace-nowrap">
        <p className="leading-[20px]">11:08</p>
      </div>
    </div>
  );
}

function Carrier() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.661px]" data-name="Carrier">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67.6611 20">
        <g id="Carrier">
          <path d={svgPaths.p25c9c700} fill="var(--fill-0, white)" id="Signal" />
          <path d={svgPaths.p8fa51f0} fill="var(--fill-0, white)" id="Wi-Fi" />
          <g id="Battery">
            <rect height="10.3333" id="Border" opacity="0.35" rx="3.5" stroke="var(--stroke-0, white)" width="21" x="43.833" y="4.83333" />
            <path d={svgPaths.p2deda380} fill="var(--fill-0, white)" id="Cap" opacity="0.4" />
            <rect fill="var(--fill-0, white)" height="7.33333" id="Capacity" rx="2.3" width="18" x="45.333" y="6.33333" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="content-stretch flex items-start justify-between pb-[10px] pl-[32px] pr-[24px] pt-[18px] relative shrink-0 w-[375px]" data-name="Status Bar">
      <TimeWrapper />
      <Carrier />
    </div>
  );
}

function Controls() {
  return <div className="h-[24px] shrink-0 w-full" data-name="Controls" />;
}

function NavigationBar() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center px-[24px] py-[16px] relative shrink-0 w-[375px]" data-name="Navigation Bar">
      <Controls />
    </div>
  );
}

function DeprecatedMasterTopBar() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="_⚠️ DEPRECATED - Master Top Bar">
      <StatusBar />
      <NavigationBar />
    </div>
  );
}

function DeprecatedTopBar() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="⚠️ DEPRECATED - Top Bar">
      <DeprecatedMasterTopBar />
    </div>
  );
}

function Step1() {
  return (
    <div className="content-stretch flex flex-col items-start p-[24px] relative shrink-0 w-[375px]" data-name="Step 1">
      <div className="flex flex-col font-['Graphik:Medium',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[36px] text-[rgba(0,0,0,0.96)] tracking-[-1.08px] w-[327px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
        <p className="leading-[1.1] whitespace-pre-wrap">Preparing your fresh start</p>
      </div>
    </div>
  );
}

function TitleStack() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="Title Stack">
      <Step1 />
    </div>
  );
}

function IndicatorBar() {
  return (
    <div className="absolute inset-[0_98.78%_0_0]" data-name="Indicator Bar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
        <g id="Indicator Bar">
          <path d={svgPaths.pab0f100} fill="var(--fill-0, #820AD1)" id="Indicator 0%" />
        </g>
      </svg>
    </div>
  );
}

function ProgressIndicator() {
  return (
    <div className="h-[4px] relative shrink-0 w-[327px]" data-name="Progress Indicator">
      <div className="absolute bg-[#efefef] inset-0 rounded-[8px]" data-name="Track" />
      <IndicatorBar />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute bottom-[80px] content-stretch flex flex-col gap-[24px] items-center left-0" data-name="Content">
      <TitleStack />
      <ProgressIndicator />
    </div>
  );
}

function Step() {
  return (
    <div className="absolute h-[667px] left-0 top-0 w-[375px]" data-name="Step 1">
      <Content />
    </div>
  );
}

function LoadingTransition() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-full" data-name="Loading / Transition">
      <Step />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[46px] items-center justify-end overflow-clip relative rounded-[40px] size-full" data-name="Loading 1 1">
      <DeprecatedTopBar />
      <LoadingTransition />
    </div>
  );
}