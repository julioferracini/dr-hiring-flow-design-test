import svgPaths from "./svg-46afikd1dx";

function TimeWrapper() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Time Wrapper">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white tracking-[-0.24px] whitespace-nowrap">
        <p className="leading-[20px]">09:07</p>
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
    <div className="h-[44px] relative shrink-0 w-full" data-name="Status Bar">
      <div className="content-stretch flex items-start justify-between pb-[10px] pl-[32px] pr-[24px] pt-[18px] relative size-full">
        <TimeWrapper />
        <Carrier />
      </div>
    </div>
  );
}

function Trailing() {
  return <div className="-translate-y-1/2 absolute content-stretch flex items-center overflow-clip right-[10px] top-1/2" data-name="Trailing" />;
}

function Title1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Title">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1f0230] text-[14px] text-center text-ellipsis whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">Settle balance</p>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[8px] h-[22px] items-center justify-center left-[calc(50%-0.5px)] max-w-[223px] top-1/2" data-name="Title">
      <Title1 />
    </div>
  );
}

function MagicIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="[Magic] Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="[Magic] Icon">
          <path d={svgPaths.p15d88280} fill="var(--fill-0, #1F0230)" fillOpacity="0.62" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function IconAction1() {
  return (
    <div className="content-stretch flex items-center justify-center p-[6px] relative shrink-0 w-[32px]" data-name="Icon Action">
      <MagicIcon />
    </div>
  );
}

function IconAction() {
  return (
    <div className="content-stretch flex items-center justify-center max-h-[44px] max-w-[44px] min-h-[44px] min-w-[44px] relative rounded-[64px] shrink-0 size-[44px]" data-name="Icon Action">
      <IconAction1 />
    </div>
  );
}

function TouchTarget() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[44px]" data-name="Touch Target">
      <IconAction />
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
    <div className="absolute bg-[rgba(255,255,255,0.64)] content-stretch flex flex-col items-center left-0 top-0 w-[375px]" data-name="Header">
      <MagicTopBar />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#820ad1] text-[12px] text-center whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3]">All debts</p>
      </div>
    </div>
  );
}

function Segment() {
  return (
    <div className="bg-white flex-[1_0_0] h-[44px] min-h-px min-w-px relative rounded-[999px]" data-name="Segment 2">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] relative size-full">
          <Content />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(31,0,47,0.1),inset_0px_0px_0px_1px_rgba(31,0,47,0.02)]" />
      <div aria-hidden="true" className="absolute border border-[rgba(31,2,48,0.08)] border-solid inset-0 pointer-events-none rounded-[999px] shadow-[0px_1px_0px_0px_rgba(31,0,47,0.05)]" />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(31,2,48,0.62)] text-center whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3]">Credit card</p>
      </div>
    </div>
  );
}

function Segment2() {
  return (
    <div className="bg-[rgba(31,2,48,0)] flex-[1_0_0] h-[44px] min-h-px min-w-px relative rounded-[999px]" data-name="Segment 4">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] relative size-full">
          <Content2 />
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(31,2,48,0.62)] whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3]">Loans</p>
      </div>
    </div>
  );
}

function Segment1() {
  return (
    <div className="bg-[rgba(31,2,48,0)] flex-[1_0_0] h-[44px] min-h-px min-w-px relative rounded-[999px]" data-name="Segment 3">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] relative size-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#f8f6f8] h-[48px] relative rounded-[64px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center overflow-x-auto overflow-y-clip size-full">
        <div className="content-stretch flex items-center p-[2px] relative size-full">
          <Segment />
          <Segment2 />
          <Segment1 />
        </div>
      </div>
    </div>
  );
}

function MagicSegmentedControl() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="[Magic] Segmented Control">
      <Container />
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#ddf5e5] content-stretch flex items-center max-w-[359px] min-h-[20px] overflow-clip px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="Badge">
      <p className="flex-[1_0_0] font-['Nu_Sans_Text:Semibold',sans-serif] leading-[1.3] min-h-px min-w-px not-italic overflow-hidden relative text-[#0c7a3a] text-[12px] text-center text-ellipsis tracking-[0.12px] whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        Get $463.00 OFF
      </p>
    </div>
  );
}

function TrailingContent() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="Trailing content">
      <Badge />
    </div>
  );
}

function Numbers() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center px-[110px] py-[7px] relative shrink-0 w-[336px]" data-name="Numbers">
      <div className="flex flex-col font-['Nu_Sans_Display:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1f0230] text-[36px] text-center whitespace-nowrap">
        <p className="leading-[1.1]">$ 1.126,50</p>
      </div>
      <TrailingContent />
    </div>
  );
}

function A() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="A">
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(31,2,48,0.62)] text-center w-[335px]">
        <p className="leading-[1.3] whitespace-pre-wrap">Total balance</p>
      </div>
      <p className="font-['Nu_Sans_Text:Regular',sans-serif] leading-[0] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(31,2,48,0.62)] text-center text-ellipsis tracking-[0.12px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <span className="leading-[1.3]">from</span>
        <span className="font-['Graphik:Medium',sans-serif] leading-[1.3]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>{` `}</span>
        <span className="[text-decoration-skip-ink:none] decoration-solid font-['Graphik:Regular',sans-serif] leading-[1.3] line-through" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
          $ 1.589,50
        </span>
        <span className="font-['Graphik:Medium',sans-serif] leading-[1.3]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>{` `}</span>
        <span className="leading-[1.3]">to:</span>
      </p>
      <Numbers />
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[336px]" data-name="Title">
      <A />
    </div>
  );
}

function MainValues() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-[335px]" data-name="Main Values">
      <Title2 />
    </div>
  );
}

function SlideBoxSpace() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-x-auto overflow-y-clip py-[12px] relative shrink-0" data-name="slide-box-space">
      <MainValues />
    </div>
  );
}

function MagicBadge() {
  return (
    <div className="bg-[#f6ecff] content-stretch flex items-center justify-center max-w-[359px] min-h-[20px] overflow-clip px-[8px] py-[2px] relative rounded-[8px] shrink-0" data-name="[Magic] Badge">
      <p className="flex-[1_0_0] font-['Nu_Sans_Text:Semibold',sans-serif] leading-[1.3] min-h-px min-w-px not-italic overflow-hidden relative text-[#820ad1] text-[12px] text-center text-ellipsis tracking-[0.12px] whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        Budget relief
      </p>
    </div>
  );
}

function PaymentInfo() {
  return (
    <div className="content-stretch flex gap-[4px] items-start leading-[1.3] not-italic relative shrink-0 text-[12px] text-ellipsis" data-name="Payment Info">
      <p className="font-['Graphik:Regular',sans-serif] overflow-hidden relative shrink-0 text-[rgba(0,0,0,0.64)]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        First payment from
      </p>
      <p className="font-['Graphik:Medium',sans-serif] overflow-hidden relative shrink-0 text-[rgba(0,0,0,0.96)]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        R$ 50,00
      </p>
    </div>
  );
}

function Block() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="block">
      <MagicBadge />
      <p className="font-['Graphik:Medium',sans-serif] leading-[1.2] min-w-full not-italic overflow-hidden relative shrink-0 text-[#1f002f] text-[20px] text-ellipsis tracking-[-0.4px] w-[min-content] whitespace-pre-wrap" style={{ fontFeatureSettings: "\'ss05\'" }}>
        Solve all debts monthly
      </p>
      <PaymentInfo />
      <p className="font-['Graphik:Medium',sans-serif] leading-[1.3] not-italic overflow-hidden relative shrink-0 text-[#0c7a3a] text-[12px] text-ellipsis" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        Up to $381.50 OFF
      </p>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-end justify-end min-h-px min-w-px relative" data-name="Content">
      <Block />
    </div>
  );
}

function Wrapper1() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-[303px]" data-name="Wrapper">
      <Content4 />
    </div>
  );
}

function Top() {
  return (
    <div className="relative shrink-0 w-full" data-name="Top">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[20px] relative w-full">
          <Wrapper1 />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#820ad1] content-stretch flex gap-[4px] h-[36px] items-center justify-center max-h-[40px] max-w-[359px] min-h-[36px] px-[16px] relative rounded-[64px] shadow-[0px_1px_0px_0px_rgba(31,0,47,0.05)] shrink-0 w-[327px]" data-name="Button">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] max-w-[295px] not-italic overflow-hidden relative shrink-0 text-[12px] text-center text-ellipsis text-white tracking-[0.12px] whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">Check out this offer</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.08),inset_0px_-1px_0px_0px_rgba(31,2,48,0.46)]" />
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-center relative shrink-0 w-full" data-name="Buttons">
      <Button />
    </div>
  );
}

function Bottom() {
  return (
    <div className="relative shrink-0 w-full" data-name="Bottom">
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end pb-[12px] px-[12px] relative w-full">
          <Buttons />
        </div>
      </div>
    </div>
  );
}

function Wrapper() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Wrapper">
      <Top />
      <Bottom />
    </div>
  );
}

function OfferHighlight() {
  return (
    <div className="bg-[#faf6ff] relative rounded-[24px] shrink-0 w-[327px]" data-name="Offer-highlight01">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Wrapper />
      </div>
      <div aria-hidden="true" className="absolute border-[#d2a5ff] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function PaymentInfo1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start leading-[1.3] relative shrink-0 text-[12px]" data-name="Payment Info">
      <p className="font-['Graphik:Regular',sans-serif] overflow-hidden relative shrink-0 text-[rgba(0,0,0,0.64)]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        Pay only
      </p>
      <p className="font-['Graphik:Medium',sans-serif] overflow-hidden relative shrink-0 text-[rgba(0,0,0,0.96)]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        $1,126.50
      </p>
    </div>
  );
}

function Block1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px not-italic relative text-ellipsis" data-name="block">
      <p className="font-['Graphik:Medium',sans-serif] leading-[1.2] min-w-full overflow-hidden relative shrink-0 text-[#1f002f] text-[20px] tracking-[-0.4px] w-[min-content] whitespace-pre-wrap" style={{ fontFeatureSettings: "\'ss05\'" }}>
        Solve all debts now
      </p>
      <PaymentInfo1 />
      <p className="font-['Graphik:Medium',sans-serif] leading-[1.3] overflow-hidden relative shrink-0 text-[#0c7a3a] text-[12px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        Get $463.00 OFF
      </p>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-end justify-end min-h-px min-w-px relative" data-name="Content">
      <Block1 />
    </div>
  );
}

function Wrapper3() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-[303px]" data-name="Wrapper">
      <Content5 />
    </div>
  );
}

function Top1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Top">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[20px] relative w-full">
          <Wrapper3 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[36px] max-h-[40px] max-w-[359px] min-h-[36px] relative rounded-[64px] shrink-0 w-[327px]" data-name="Button">
      <div className="content-stretch flex gap-[4px] items-center justify-center max-h-[inherit] max-w-[inherit] min-h-[inherit] overflow-clip px-[16px] relative rounded-[inherit] size-full">
        <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] max-w-[295px] not-italic overflow-hidden relative shrink-0 text-[#1f0230] text-[12px] text-center text-ellipsis tracking-[0.12px] whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
          <p className="leading-[1.3] overflow-hidden">Pay</p>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(31,0,47,0.1),inset_0px_0px_0px_1px_rgba(31,0,47,0.02)]" />
      <div aria-hidden="true" className="absolute border border-[rgba(31,2,48,0.08)] border-solid inset-0 pointer-events-none rounded-[64px] shadow-[0px_1px_0px_0px_rgba(31,0,47,0.05)]" />
    </div>
  );
}

function Buttons1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[36px] items-center relative shrink-0 w-full" data-name="Buttons">
      <Button1 />
    </div>
  );
}

function Bottom1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Bottom">
      <div className="flex flex-col justify-end size-full">
        <div className="content-stretch flex flex-col items-start justify-end pb-[12px] px-[12px] relative w-full">
          <Buttons1 />
        </div>
      </div>
    </div>
  );
}

function Wrapper2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Wrapper">
      <Top1 />
      <Bottom1 />
    </div>
  );
}

function Offer() {
  return (
    <div className="bg-white relative rounded-[24px] shrink-0 w-[327px]" data-name="Offer">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Wrapper2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#b8b8b8] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center pb-[12px] pt-[128px] px-[20px] relative shrink-0 w-[375px]" data-name="Content1">
      <MagicSegmentedControl />
      <SlideBoxSpace />
      <OfferHighlight />
      <Offer />
    </div>
  );
}

function Scroll() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[812px] items-start left-0 overflow-x-clip overflow-y-auto pb-[16px] rounded-[40px] top-0 w-[375px]" data-name="Scroll">
      <Content1 />
    </div>
  );
}

export default function OfferHub01En() {
  return (
    <div className="overflow-clip relative rounded-[40px] size-full" data-name="Offer Hub 01 EN">
      <Header />
      <Scroll />
    </div>
  );
}