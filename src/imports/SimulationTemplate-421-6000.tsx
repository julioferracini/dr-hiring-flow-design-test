import svgPaths from "./svg-6wnifln8x3";

function TimeWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Time Wrapper">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white tracking-[-0.24px] whitespace-nowrap">
        <p className="leading-[20px]">11:08</p>
      </div>
    </div>
  );
}

function Carrier() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.661px]" data-name="Carrier">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67.6611 20">
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

function Title1() {
  return <div className="content-stretch flex items-center justify-center shrink-0" data-name="Title" />;
}

function Title() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[8px] h-[22px] items-center justify-center left-[calc(50%-0.5px)] max-w-[223px] top-1/2" data-name="Title">
      <Title1 />
    </div>
  );
}

function IconAction() {
  return (
    <div className="content-stretch flex items-center justify-center p-[6px] relative shrink-0 w-[32px]" data-name="Icon Action">
      <div className="relative shrink-0 size-[20px]" data-name="[Magic] Icon">
        <div className="absolute bottom-[13.72%] left-1/4 right-[34.55%] top-[13.72%]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.08926 14.5118">
            <path d={svgPaths.p3b0bc300} fill="var(--fill-0, #1F0230)" fillOpacity="0.62" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TouchTarget() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[44px]" data-name="Touch Target">
      <div className="content-stretch flex items-center justify-center max-h-[44px] max-w-[44px] min-h-[44px] min-w-[44px] relative rounded-[64px] shrink-0 size-[44px]" data-name="Icon Action">
        <IconAction />
      </div>
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
      <Title />
      <Leading />
    </div>
  );
}

function Title2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-[20px] pt-[12px] px-[20px] relative w-full">
          <p className="font-['Graphik:Medium',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#1f0230] text-[36px] text-center tracking-[-1.08px] w-full whitespace-pre-wrap" style={{ fontFeatureSettings: "'ss05'" }}>{`Customize your  payments`}</p>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col items-center relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full" data-name="[Magic] Top Bar">
        <div className="h-[44px] relative shrink-0 w-full" data-name="Status Bar">
          <div className="content-stretch flex items-start justify-between pb-[10px] pl-[32px] pr-[24px] pt-[18px] relative size-full">
            <TimeWrapper />
            <Carrier />
          </div>
        </div>
        <TopBar />
      </div>
      <Title2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Graphik:Medium',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#1f002f] text-[44px] text-center tracking-[-1.32px]" style={{ fontFeatureSettings: "'ss05'" }}>
        $ 999.99
      </p>
    </div>
  );
}

function Big() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Big">
      <Frame />
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center py-[20px] relative shrink-0 w-[375px]" data-name="Input">
      <Big />
      <div className="bg-[#efefef] h-[4px] shrink-0 w-[220px]" data-name="Divider" />
      <div className="flex flex-col font-['Graphik:Regular',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis tracking-[-0.14px] whitespace-nowrap" style={{ fontFeatureSettings: "'ss05'" }}>
        <p className="leading-[1.5] overflow-hidden">Monthly payment</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['Graphik:Medium',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#1f0230] text-[44px] text-center tracking-[-1.32px] uppercase" style={{ fontFeatureSettings: "'ss05', 'lnum', 'tnum'" }}>
        01
      </p>
    </div>
  );
}

function Big1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Big">
      <Frame1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-[7px]" data-name="Group1">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-[155.5px] not-italic overflow-hidden text-[#0c7a3a] text-[14px] text-center text-ellipsis top-[16px] tracking-[0.14px] w-[311px]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
        <p className="whitespace-pre-wrap">
          <span className="leading-[1.3]">{`Total savings `}</span>
          <span className="font-['Nu_Sans_Text:Semibold',sans-serif] leading-[1.3] not-italic">$ 301.33</span>
        </p>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-[60px]" data-name="Group2">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] left-0 not-italic opacity-0 overflow-hidden text-[#0c7a3a] text-[12px] text-ellipsis top-[76px] tracking-[0.12px] w-[271px]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">{`Enter an amount that fits your budget. We'll show options close to it.`}</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[32px] items-center justify-center min-h-px min-w-px relative" data-name="Content">
      <Group />
      <Group1 />
    </div>
  );
}

function Leading1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative" data-name="Leading">
      <Content1 />
    </div>
  );
}

function Wrapper() {
  return (
    <div className="bg-[#ddf5e5] content-stretch flex items-center justify-center p-[8px] relative rounded-[16px] shrink-0 w-[327px]" data-name="Wrapper">
      <div aria-hidden="true" className="absolute border border-[rgba(30,165,84,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Leading1 />
    </div>
  );
}

function ListGroup() {
  return (
    <div className="content-stretch flex flex-col items-start px-[20px] py-[16px] relative shrink-0 w-[375px]" data-name="List group">
      <Wrapper />
    </div>
  );
}

function Input1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center py-[20px] relative shrink-0 w-[375px]" data-name="Input">
      <Big1 />
      <div className="bg-[#efefef] h-[4px] shrink-0 w-[220px]" data-name="Divider" />
      <div className="flex flex-col font-['Graphik:Regular',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis tracking-[-0.14px] whitespace-nowrap" style={{ fontFeatureSettings: "'ss05'" }}>
        <p className="leading-[1.5] overflow-hidden">Installments</p>
      </div>
      <ListGroup />
    </div>
  );
}

function Indicator() {
  return (
    <div className="absolute contents left-[21px] size-[32px] top-[-4px]" data-name="indicator">
      <div className="absolute flex items-center justify-center left-[21px] size-[32px] top-[-4px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="relative size-[32px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <circle cx="16" cy="16" fill="var(--fill-0, #820AD1)" id="Ellipse 597" r="16" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndicatorBar() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Indicator Bar">
      <div className="-translate-y-1/2 absolute bg-[#e3e0e5] h-[4px] left-0 right-0 rounded-[8px] top-1/2" data-name="Track" />
      <div className="-translate-y-1/2 absolute h-[4px] left-0 right-[294px] top-1/2" data-name="Indicator">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41 4">
          <path d={svgPaths.p2042ef00} fill="var(--fill-0, #820AD1)" id="Indicator" />
        </svg>
      </div>
      <Indicator />
    </div>
  );
}

function Labels() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Nu_Sans_Text:Semibold',sans-serif] items-center justify-between leading-[0] min-h-px min-w-px not-italic relative text-[12px] text-[rgba(31,2,48,0.62)] tracking-[0.12px] whitespace-nowrap" data-name="Labels">
      <div className="flex flex-col justify-center relative shrink-0" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
        <p className="leading-[1.3]">Mais desconto</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-right" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
        <p className="leading-[1.3]">Mais tempo</p>
      </div>
    </div>
  );
}

function ValueOptional() {
  return (
    <div className="relative shrink-0 w-full" data-name="Value - Optional">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] relative w-full">
          <Labels />
        </div>
      </div>
    </div>
  );
}

function Chart() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-end px-[20px] relative shrink-0 w-[375px]" data-name="Chart">
      <IndicatorBar />
      <ValueOptional />
    </div>
  );
}

function MagicSlider() {
  return (
    <div className="content-stretch flex flex-col items-center py-[8px] relative shrink-0 w-[375px]" data-name="[Magic] Slider">
      <Chart />
    </div>
  );
}

function Slider() {
  return (
    <div className="content-stretch flex flex-col h-[92px] items-start py-[16px] relative shrink-0" data-name="Slider">
      <MagicSlider />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px not-italic overflow-clip relative text-ellipsis whitespace-pre-wrap" data-name="Text">
      <p className="font-['Nu_Sans_Text:Semibold',sans-serif] leading-[1.3] overflow-hidden relative shrink-0 text-[#1f0230] text-[18px] w-full">Total: $ 9,999.00</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Graphik:Medium',sans-serif] leading-[1.5] line-through overflow-hidden relative shrink-0 text-[16px] text-[rgba(31,2,48,0.62)] tracking-[-0.16px] w-full" style={{ fontFeatureSettings: "'ss05'" }}>
        $ 1,589.50
      </p>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Content">
      <Text />
      <div className="bg-[#820ad1] content-stretch flex gap-[8px] h-[48px] items-center justify-center max-h-[48px] max-w-[359px] min-h-[48px] px-[24px] py-[12px] relative rounded-[64px] shadow-[0px_1px_0px_0px_rgba(31,0,47,0.05)] shrink-0" data-name="[Magic] Button">
        <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] max-w-[295px] not-italic overflow-hidden relative shrink-0 text-[14px] text-center text-ellipsis text-white whitespace-nowrap" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
          <p className="leading-[1.3] overflow-hidden">Continuar</p>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.08),inset_0px_-1px_0px_0px_rgba(31,2,48,0.46)]" />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start p-[20px] relative w-full">
        <Content2 />
      </div>
    </div>
  );
}

export default function SimulationTemplate() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip pb-[16px] relative rounded-[40px] size-full" data-name="Simulation Template">
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-[375px]" data-name="[Magic] Header">
        <Content />
      </div>
      <Input />
      <Input1 />
      <Slider />
      <div className="absolute content-stretch flex flex-col items-center justify-end left-0 pb-[8px] pt-[19px] top-[780px] w-[375px]" data-name="Home Indicator">
        <div className="h-[5px] rounded-[64px] shrink-0 w-[140px]" data-name="Line" />
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-0 top-[687px] w-[375px]" data-name="[Magic] Checkout Bottom Bar">
        <div className="h-[2px] relative shrink-0 w-[375px]" data-name="[Magic] Divider">
          <div className="-translate-y-1/2 absolute h-0 left-0 right-0 top-[calc(50%+1px)]" data-name="Line">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 2">
                <line id="Line" stroke="var(--stroke-0, #1F0230)" strokeOpacity="0.08" strokeWidth="2" x2="375" y1="1" y2="1" />
              </svg>
            </div>
          </div>
        </div>
        <Container />
      </div>
    </div>
  );
}