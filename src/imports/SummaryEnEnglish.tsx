import svgPaths from "./svg-h2o8ic8eql";
import imgLeading from "../assets/b2baec999158d1ea5a2d33a31da4c4eb97f205be.png";

function TimeWrapper() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Time Wrapper">
      <div className="flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white tracking-[-0.24px] whitespace-nowrap">
        <p className="leading-[20px]">09:10</p>
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
        <p className="leading-[1.3] overflow-hidden">Summary</p>
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
    <div className="bg-[rgba(255,255,255,0.64)] content-stretch flex flex-col items-center relative shrink-0 w-[375px]" data-name="Header">
      <MagicTopBar />
    </div>
  );
}

function OutlinedObjectsTimeCalendarRenew() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24px] top-1/2" data-name="outlined/objects/time/calendar_renew">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="outlined/objects/time/calendar_renew">
          <path d={svgPaths.p3d613380} fill="var(--fill-0, #820AD1)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-[72px]" data-name="Avatar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 72">
        <path d={svgPaths.p2bf800} fill="var(--fill-0, #F6ECFF)" id="Background" />
      </svg>
      <OutlinedObjectsTimeCalendarRenew />
    </div>
  );
}

function Leading1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative rounded-[64px] shrink-0" data-name="Leading">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[64px]">
        <div className="absolute inset-0 overflow-hidden rounded-[64px]">
          <img alt="" className="absolute left-[-23.56%] max-w-none size-[143.63%] top-[-0.44%]" src={imgLeading} />
        </div>
        <div className="absolute bg-gradient-to-b from-[82.267%] from-[rgba(0,0,0,0)] inset-0 rounded-[64px] to-black" />
      </div>
      <Avatar />
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="top">
      <Leading1 />
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#ddf5e5] content-stretch flex items-center max-w-[359px] min-h-[20px] overflow-clip px-[4px] py-[2px] relative rounded-[4px] shrink-0" data-name="Badge">
      <p className="flex-[1_0_0] font-['Nu_Sans_Text:Semibold',sans-serif] leading-[1.3] min-h-px min-w-px not-italic overflow-hidden relative text-[#0c7a3a] text-[12px] text-center text-ellipsis tracking-[0.12px] whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        $315.90 total discount
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
        <p className="leading-[1.1]">$127.36</p>
      </div>
      <TrailingContent />
    </div>
  );
}

function A() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="A">
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(31,2,48,0.62)] text-center w-[335px]">
        <p className="leading-[1.3] whitespace-pre-wrap">Your monthly payment</p>
      </div>
      <Numbers />
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[336px]" data-name="Title">
      <A />
    </div>
  );
}

function MainValues() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-[335px]" data-name="Main Values">
      <Title3 />
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center pb-[20px] relative shrink-0 w-full" data-name="Title">
      <Top />
      <MainValues />
      <p className="font-['Nu_Sans_Text:Regular',sans-serif] leading-[1.5] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(31,2,48,0.62)] text-center text-ellipsis w-[307px] whitespace-pre-wrap">This renegotiation includes overdue amounts from loans and credit cards.</p>
    </div>
  );
}

function Wrapper() {
  return (
    <div className="content-stretch flex gap-[4px] h-[38px] items-center max-w-[375px] relative rounded-[8px] shrink-0" data-name="Wrapper">
      <div className="flex flex-[1_0_0] flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#820ad1] text-[14px] text-ellipsis whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">Change</p>
      </div>
    </div>
  );
}

function MagicButtonLink() {
  return (
    <div className="content-stretch flex items-center min-h-[44px] relative shrink-0" data-name="[Magic] Button Link">
      <Wrapper />
    </div>
  );
}

function MagicSectionTitle() {
  return (
    <div className="relative shrink-0 w-full" data-name="[Magic] Section Title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pb-[12px] pt-[20px] px-[20px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Nu_Sans_Display:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#1f0230] text-[20px]">
            <p className="leading-[1.2] whitespace-pre-wrap">Your payment plan</p>
          </div>
          <MagicButtonLink />
        </div>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">Number of installments</p>
      </div>
    </div>
  );
}

function Secondary() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0" data-name="Secondary">
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[#1f0230] text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">10</p>
      </div>
    </div>
  );
}

function BottomDivider() {
  return <div className="bg-[rgba(31,2,48,0.08)] h-px shrink-0 w-full" data-name="Bottom divider" />;
}

function DividerContainer() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 px-[16px] right-0" data-name="Divider container">
      <BottomDivider />
    </div>
  );
}

function MagicListRowReadOnly() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="[Magic] List Row Read-Only">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
          <Content1 />
          <Secondary />
          <DividerContainer />
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">Installment amount</p>
      </div>
    </div>
  );
}

function Secondary1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0" data-name="Secondary">
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[#1f0230] text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">$127.36</p>
      </div>
    </div>
  );
}

function BottomDivider1() {
  return <div className="bg-[rgba(31,2,48,0.08)] h-px shrink-0 w-full" data-name="Bottom divider" />;
}

function DividerContainer1() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 px-[16px] right-0" data-name="Divider container">
      <BottomDivider1 />
    </div>
  );
}

function MagicListRowReadOnly1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="[Magic] List Row Read-Only">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
          <Content2 />
          <Secondary1 />
          <DividerContainer1 />
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">First installment date</p>
      </div>
    </div>
  );
}

function Secondary2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0" data-name="Secondary">
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[#1f0230] text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">June 16, 2026</p>
      </div>
    </div>
  );
}

function BottomDivider2() {
  return <div className="bg-[rgba(31,2,48,0.08)] h-px shrink-0 w-full" data-name="Bottom divider" />;
}

function DividerContainer2() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 px-[16px] right-0" data-name="Divider container">
      <BottomDivider2 />
    </div>
  );
}

function MagicListRowReadOnly2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="[Magic] List Row Read-Only">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
          <Content3 />
          <Secondary2 />
          <DividerContainer2 />
        </div>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">Monthly payment date</p>
      </div>
    </div>
  );
}

function Secondary3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0" data-name="Secondary">
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[#1f0230] text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">every 16th</p>
      </div>
    </div>
  );
}

function MagicListRowReadOnly3() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="[Magic] List Row Read-Only">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
          <Content4 />
          <Secondary3 />
        </div>
      </div>
    </div>
  );
}

function Wrapper1() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full" data-name="Wrapper">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <MagicListRowReadOnly />
        <MagicListRowReadOnly1 />
        <MagicListRowReadOnly2 />
        <MagicListRowReadOnly3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function ListGroup() {
  return (
    <div className="relative shrink-0 w-full" data-name="List group">
      <div className="content-stretch flex flex-col items-start px-[20px] relative w-full">
        <Wrapper1 />
      </div>
    </div>
  );
}

function MagicList() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[20px] relative shrink-0 w-full" data-name="[Magic] List">
      <ListGroup />
    </div>
  );
}

function Divider() {
  return <div className="absolute bg-[#efefef] inset-[47.5%_0]" data-name="Divider" />;
}

function DeprecatedArrowDivider() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="[DEPRECATED] Arrow Divider">
      <Divider />
    </div>
  );
}

function MagicSectionTitle1() {
  return (
    <div className="relative shrink-0 w-full" data-name="[Magic] Section Title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pb-[12px] pl-[20px] pr-[8px] pt-[20px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Nu_Sans_Display:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#1f0230] text-[20px]">
            <p className="leading-[1.2] whitespace-pre-wrap">Billing details</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">Total amount financed</p>
      </div>
    </div>
  );
}

function Secondary4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0" data-name="Secondary">
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[#1f0230] text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">$770.00</p>
      </div>
    </div>
  );
}

function MagicListRowReadOnly4() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="[Magic] List Row Read-Only">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
          <Content5 />
          <Secondary4 />
        </div>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">Total interest</p>
      </div>
    </div>
  );
}

function Secondary5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0" data-name="Secondary">
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[#1f0230] text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">$63.60</p>
      </div>
    </div>
  );
}

function MagicListRowReadOnly5() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="[Magic] List Row Read-Only">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
          <Content6 />
          <Secondary5 />
        </div>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">Monthly interest</p>
      </div>
    </div>
  );
}

function Secondary6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0" data-name="Secondary">
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.96)] text-ellipsis text-right whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">1.99%</p>
      </div>
    </div>
  );
}

function MagicListRowReadOnly6() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="[Magic] List Row Read-Only">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
          <Content7 />
          <Secondary6 />
        </div>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px overflow-clip relative" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1f0230] text-[14px] text-ellipsis w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">Total amount to pay</p>
      </div>
    </div>
  );
}

function Secondary7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip relative shrink-0" data-name="Secondary">
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] max-w-[135px] not-italic overflow-hidden relative shrink-0 text-[#1f0230] text-[14px] text-ellipsis text-right whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">$823.60</p>
      </div>
    </div>
  );
}

function MagicListRowReadOnly7() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="[Magic] List Row Read-Only">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[20px] py-[16px] relative w-full">
          <Content8 />
          <Secondary7 />
        </div>
      </div>
    </div>
  );
}

function Wrapper2() {
  return (
    <div className="bg-white relative rounded-[24px] shrink-0 w-full" data-name="Wrapper">
      <div className="content-stretch flex flex-col items-start overflow-clip py-[4px] relative rounded-[inherit] w-full">
        <MagicListRowReadOnly4 />
        <MagicListRowReadOnly5 />
        <MagicListRowReadOnly6 />
        <MagicListRowReadOnly7 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(31,0,47,0.1),inset_0px_0px_0px_1px_rgba(31,0,47,0.02)]" />
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_0px_0px_rgba(31,0,47,0.05)]" />
    </div>
  );
}

function ListGroup1() {
  return (
    <div className="relative shrink-0 w-full" data-name="List group">
      <div className="content-stretch flex flex-col items-start px-[20px] relative w-full">
        <Wrapper2 />
      </div>
    </div>
  );
}

function MagicList1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0 w-full" data-name="[Magic] List">
      <ListGroup1 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content">
      <MagicSectionTitle />
      <MagicList />
      <DeprecatedArrowDivider />
      <MagicSectionTitle1 />
      <MagicList1 />
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Main">
      <Title2 />
      <Content />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#820ad1] content-stretch flex gap-[8px] h-[48px] items-center justify-center max-h-[48px] min-h-[48px] px-[24px] py-[12px] relative rounded-[64px] shrink-0 w-[335px]" data-name="Button">
      <div className="flex flex-col font-['Graphik:Medium',sans-serif] justify-center leading-[0] max-w-[295px] not-italic overflow-hidden relative shrink-0 text-[16px] text-center text-ellipsis text-white tracking-[-0.16px] whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">Continue</p>
      </div>
    </div>
  );
}

function BottomWrapper() {
  return (
    <div className="absolute backdrop-blur-[8px] bg-[rgba(236,233,238,0.64)] bottom-0 content-stretch flex flex-col gap-[12px] items-center left-0 py-[20px] w-[375px]" data-name="Bottom Wrapper">
      <Button />
      <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.64)] text-center tracking-[0.12px] w-[327px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="whitespace-pre-wrap">
          <span className="leading-[1.3]">{`By confirming, you accept the `}</span>
          <span className="leading-[1.3] text-[#820ad1]">{`Terms & Conditions.`}</span>
        </p>
      </div>
    </div>
  );
}

export default function SummaryEnEnglish() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip pb-[16px] relative rounded-[40px] size-full" data-name="Summary EN - English">
      <Header />
      <Main />
      <BottomWrapper />
    </div>
  );
}