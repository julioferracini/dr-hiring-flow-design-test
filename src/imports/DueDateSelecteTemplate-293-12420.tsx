import svgPaths from "./svg-j2wmit3032";

function TimeWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Time Wrapper">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1f0230] text-[15px] text-center tracking-[-0.24px] whitespace-nowrap">
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
          <path d={svgPaths.p25c9c700} fill="var(--fill-0, #1F0230)" id="Signal" />
          <path d={svgPaths.p8fa51f0} fill="var(--fill-0, #1F0230)" id="Wi-Fi" />
          <g id="Battery">
            <rect height="10.3333" id="Border" opacity="0.35" rx="3.5" stroke="var(--stroke-0, #1F0230)" width="21" x="43.833" y="4.83333" />
            <path d={svgPaths.p2deda380} fill="var(--fill-0, #1F0230)" id="Cap" opacity="0.4" />
            <rect fill="var(--fill-0, #1F0230)" height="7.33333" id="Capacity" rx="2.3" width="18" x="45.333" y="6.33333" />
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

function Title1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Title">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1f0230] text-[16px] text-center text-ellipsis whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">Solve monthly</p>
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
          <path d={svgPaths.p6108900} fill="var(--fill-0, #1F0230)" fillOpacity="0.62" id="Icon" />
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
      <Title />
      <Leading />
    </div>
  );
}

function MagicTopBar() {
  return (
    <div className="content-stretch flex flex-col items-center relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full" data-name="[Magic] Top Bar">
      <StatusBar />
      <TopBar />
    </div>
  );
}

function Title2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start not-italic pb-[20px] pt-[12px] px-[20px] relative w-full whitespace-pre-wrap">
          <p className="font-['Graphik:Medium',sans-serif] leading-[1.1] relative shrink-0 text-[#1f0230] text-[36px] tracking-[-1.08px] w-full" style={{ fontFeatureSettings: "\'ss05\'" }}>
            When can you make the first payment?
          </p>
          <p className="font-['Nu_Sans_Text:Regular',sans-serif] leading-[1.3] relative shrink-0 text-[18px] text-[rgba(31,2,48,0.62)] w-full">Payment is made every month, on the day you choose.</p>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Content">
      <MagicTopBar />
      <Title2 />
    </div>
  );
}

function MagicHeader() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[375px]" data-name="[Magic] Header">
      <Content />
    </div>
  );
}

function PrimaryWrapper() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Primary Wrapper">
      <div className="flex flex-col font-['Graphik:Medium',sans-serif] justify-center leading-[0] not-italic relative self-stretch shrink-0 text-[14px] text-[rgba(0,0,0,0.96)] tracking-[-0.14px] w-[245px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">10 parcelas de R$ 127,36</p>
      </div>
    </div>
  );
}

function DescriptionWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Description Wrapper">
      <div className="flex flex-col font-['Graphik:Regular',sans-serif] h-full justify-center leading-[1.3] not-italic relative shrink-0 text-[0px] text-[12px] text-[rgba(0,0,0,0.64)] w-[245px] whitespace-pre-wrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="mb-0 text-[#0c7a3a]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
          R$ 315,90 de desconto
        </p>
        <p style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>Total: R$ 1.264,60</p>
      </div>
    </div>
  );
}

function TextWrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text Wrapper">
      <PrimaryWrapper />
      <DescriptionWrapper />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px min-w-px overflow-clip relative self-stretch z-[2]" data-name="Content">
      <TextWrapper />
    </div>
  );
}

function ContentArea() {
  return (
    <div className="content-stretch flex gap-[16px] isolate items-start justify-center px-[24px] py-[16px] relative shrink-0 w-[375px]" data-name="Content area">
      <Content1 />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[rgba(255,255,255,0.64)] content-stretch flex flex-col items-center relative shrink-0 w-[375px]" data-name="Header">
      <MagicHeader />
      <ContentArea />
    </div>
  );
}

function Secondary() {
  return (
    <div className="content-stretch flex items-center justify-end pr-[12px] relative shrink-0" data-name="Secondary">
      <div className="flex flex-col font-['Graphik:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#820ad1] text-[14px] text-right tracking-[-0.14px] whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3]">Other dates</p>
      </div>
    </div>
  );
}

function MagicSectionTitle() {
  return (
    <div className="h-[48px] max-h-[48px] min-h-[48px] relative shrink-0 w-full" data-name="[Magic] Section Title">
      <div className="flex flex-row items-center max-h-[inherit] min-h-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-h-[inherit] min-h-[inherit] pl-[20px] pr-[8px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Graphik:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.96)] tracking-[-0.16px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
            <p className="leading-[1.3] whitespace-pre-wrap">Due date</p>
          </div>
          <Secondary />
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[1.3] min-h-px min-w-px not-italic relative text-[12px] whitespace-pre-wrap" data-name="Content">
      <p className="font-['Graphik:Medium',sans-serif] relative shrink-0 text-[rgba(0,0,0,0.96)] w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        Jun 16
      </p>
      <p className="font-['Graphik:Regular',sans-serif] relative shrink-0 text-[rgba(0,0,0,0.64)] w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        Today
      </p>
    </div>
  );
}

function BottomContent() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-full" data-name="Bottom Content">
      <Content2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-between min-h-px min-w-px relative" data-name="Container">
      <BottomContent />
    </div>
  );
}

function Tile() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="Tile 1">
      <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-end p-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
            <Container />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[1.3] min-h-px min-w-px not-italic relative text-[12px] whitespace-pre-wrap" data-name="Content">
      <p className="font-['Graphik:Medium',sans-serif] relative shrink-0 text-[rgba(0,0,0,0.96)] w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        Jun 17
      </p>
      <p className="font-['Graphik:Regular',sans-serif] relative shrink-0 text-[rgba(0,0,0,0.64)] w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        Tomorrow
      </p>
    </div>
  );
}

function BottomContent1() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-full" data-name="Bottom Content">
      <Content3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-between min-h-px min-w-px relative" data-name="Container">
      <BottomContent1 />
    </div>
  );
}

function Tile1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="Tile 2">
      <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-end p-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
            <Container1 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[1.3] min-h-px min-w-px not-italic relative text-[12px] whitespace-pre-wrap" data-name="Content">
      <p className="font-['Graphik:Medium',sans-serif] relative shrink-0 text-[rgba(0,0,0,0.96)] w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        Jun 18
      </p>
      <p className="font-['Graphik:Regular',sans-serif] relative shrink-0 text-[rgba(0,0,0,0.64)] w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        Monday
      </p>
    </div>
  );
}

function BottomContent2() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-full" data-name="Bottom Content">
      <Content4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-between min-h-px min-w-px relative" data-name="Container">
      <BottomContent2 />
    </div>
  );
}

function Tile2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]" data-name="Tile 3">
      <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-end p-[16px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-end self-stretch">
            <Container2 />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center px-[20px] relative shrink-0 w-[375px]" data-name="Row 1">
      <Tile />
      <Tile1 />
      <Tile2 />
    </div>
  );
}

function Tiles() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-x-auto overflow-y-clip py-[8px] relative shrink-0 w-[375px]" data-name="Tiles">
      <Row />
    </div>
  );
}

function Wrapper() {
  return (
    <div className="content-stretch flex flex-col items-start py-[8px] relative shrink-0 w-full" data-name="Wrapper">
      <Tiles />
    </div>
  );
}

function DueDate() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip py-[4px] relative shrink-0 w-[375px]" data-name="Due-date">
      <MagicSectionTitle />
      <Wrapper />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[rgba(255,255,255,0.64)] content-stretch flex flex-col items-center relative shrink-0 w-[375px]" data-name="Header">
      <Header1 />
      <DueDate />
    </div>
  );
}

export default function DueDateSelecteTemplate() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip pb-[16px] relative rounded-[40px] size-full" data-name="Due Date Selecte Template">
      <Header />
    </div>
  );
}