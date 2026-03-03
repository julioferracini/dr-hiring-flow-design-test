import svgPaths from "./svg-i7zhhrerey";

function OutlinedUiActionsNavigationClose() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24.002px] top-1/2" data-name="outlined/ui actions/navigation/close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.0024 24.0024">
        <g id="outlined/ui actions/navigation/close">
          <path d={svgPaths.p5753700} fill="var(--fill-0, black)" fillOpacity="0.64" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function IconAction() {
  return (
    <div className="relative rounded-[64px] shrink-0 size-[32px]" data-name="Icon Action">
      <OutlinedUiActionsNavigationClose />
    </div>
  );
}

function TouchTarget() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[48px]" data-name="Touch Target">
      <IconAction />
    </div>
  );
}

function Leading() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-center left-[12px] overflow-clip top-1/2" data-name="Leading">
      <TouchTarget />
    </div>
  );
}

function TopBar1() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Top Bar">
      <Leading />
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Top Bar">
      <TopBar1 />
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-[24px] pt-[8px] px-[24px] relative w-full">
          <p className="font-['Nu_Sans_Text:Semibold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[28px] text-[rgba(0,0,0,0.96)] tracking-[-0.84px] w-full whitespace-pre-wrap" style={{ fontFeatureSettings: "\'ss05\'" }}>
            Choose a payment date
          </p>
        </div>
      </div>
    </div>
  );
}

function MagicOutlinedUiActionsNavigationChevron() {
  return (
    <div className="relative size-[20px]" data-name="[Magic] outlined/ui actions/navigation/chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="[Magic] outlined/ui actions/navigation/chevron">
          <path d={svgPaths.p340e8f00} fill="var(--fill-0, #1F0230)" fillOpacity="0.3" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function MagicOutlinedUiActionsNavigationChevron1() {
  return (
    <div className="absolute right-[12px] size-[20px] top-[2px]" data-name="[Magic] outlined/ui actions/navigation/chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="[Magic] outlined/ui actions/navigation/chevron">
          <path d={svgPaths.p340e8f00} fill="var(--fill-0, #1F0230)" fillOpacity="0.62" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute contents right-[12px] top-[2px]" data-name="Navigation">
      <div className="absolute flex items-center justify-center right-[56px] size-[20px] top-[2px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <MagicOutlinedUiActionsNavigationChevron />
        </div>
      </div>
      <MagicOutlinedUiActionsNavigationChevron1 />
    </div>
  );
}

function HeaderOptional() {
  return (
    <div className="h-[24px] relative shrink-0 w-[332px]" data-name="Header - Optional">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] left-px not-italic text-[#1f0230] text-[16px] top-[11.5px] whitespace-nowrap">
        <p className="leading-[1.3]">September 2025</p>
      </div>
      <Navigation />
    </div>
  );
}

function BbDatePickerWeekdays() {
  return (
    <div className="content-stretch flex font-['Nu_Sans_Text:Semibold',sans-serif] gap-[4px] items-center leading-[0] not-italic overflow-clip relative shrink-0 text-[12px] text-[rgba(31,2,48,0.62)] text-center tracking-[0.12px]" data-name="_BB / Date Picker / Weekdays">
      <div className="flex flex-col justify-center relative shrink-0 w-[44px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">S</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[44px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">M</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[44px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">T</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[44px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">W</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[44px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">T</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[44px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">F</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 w-[44px]" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">S</p>
      </div>
    </div>
  );
}

function DaysTitleOptional() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Days Title - Optional">
      <BbDatePickerWeekdays />
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Top">
      <HeaderOptional />
      <DaysTitleOptional />
    </div>
  );
}

function BbDatePickerDay() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">1</p>
      </div>
    </div>
  );
}

function BbDatePickerDay1() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function BbDatePickerDay2() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">3</p>
      </div>
    </div>
  );
}

function BbDatePickerDay3() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">4</p>
      </div>
    </div>
  );
}

function BbDatePickerDay4() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">5</p>
      </div>
    </div>
  );
}

function BbDatePickerDay5() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">6</p>
      </div>
    </div>
  );
}

function BbDatePickerDay6() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">7</p>
      </div>
    </div>
  );
}

function Week() {
  return (
    <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0" data-name="Week">
      <BbDatePickerDay />
      <BbDatePickerDay1 />
      <BbDatePickerDay2 />
      <BbDatePickerDay3 />
      <BbDatePickerDay4 />
      <BbDatePickerDay5 />
      <BbDatePickerDay6 />
    </div>
  );
}

function BbDatePickerDay7() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">8</p>
      </div>
    </div>
  );
}

function BbDatePickerDay8() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">9</p>
      </div>
    </div>
  );
}

function BbDatePickerDay9() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">10</p>
      </div>
    </div>
  );
}

function BbDatePickerDay10() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">11</p>
      </div>
    </div>
  );
}

function BbDatePickerDay11() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">12</p>
      </div>
    </div>
  );
}

function BbDatePickerDay12() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">13</p>
      </div>
    </div>
  );
}

function BbDatePickerDay13() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">14</p>
      </div>
    </div>
  );
}

function Week1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0" data-name="Week">
      <BbDatePickerDay7 />
      <BbDatePickerDay8 />
      <BbDatePickerDay9 />
      <BbDatePickerDay10 />
      <BbDatePickerDay11 />
      <BbDatePickerDay12 />
      <BbDatePickerDay13 />
    </div>
  );
}

function BbDatePickerDay14() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">15</p>
      </div>
    </div>
  );
}

function BbDatePickerDay15() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">16</p>
      </div>
    </div>
  );
}

function BbDatePickerDay16() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">17</p>
      </div>
    </div>
  );
}

function BbDatePickerDay17() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">18</p>
      </div>
    </div>
  );
}

function BbDatePickerDay18() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">19</p>
      </div>
    </div>
  );
}

function BbDatePickerDay19() {
  return (
    <div className="bg-[#f8f6f8] overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[#1f0230] text-[18px] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">20</p>
      </div>
    </div>
  );
}

function BbDatePickerDay20() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">21</p>
      </div>
    </div>
  );
}

function Week2() {
  return (
    <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0" data-name="Week">
      <BbDatePickerDay14 />
      <BbDatePickerDay15 />
      <BbDatePickerDay16 />
      <BbDatePickerDay17 />
      <BbDatePickerDay18 />
      <BbDatePickerDay19 />
      <BbDatePickerDay20 />
    </div>
  );
}

function BbDatePickerDay21() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">22</p>
      </div>
    </div>
  );
}

function BbDatePickerDay22() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(0,0,0,0.96)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">23</p>
      </div>
    </div>
  );
}

function BbDatePickerDay23() {
  return (
    <div className="bg-[#faf6ff] overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[#820ad1] text-[18px] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">24</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_2px_#820ad1,inset_0px_1px_0px_2px_rgba(31,0,47,0.1)]" />
    </div>
  );
}

function BbDatePickerDay24() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(0,0,0,0.96)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">25</p>
      </div>
    </div>
  );
}

function BbDatePickerDay25() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(0,0,0,0.96)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">26</p>
      </div>
    </div>
  );
}

function BbDatePickerDay26() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(0,0,0,0.96)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">27</p>
      </div>
    </div>
  );
}

function BbDatePickerDay27() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">28</p>
      </div>
    </div>
  );
}

function Week3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center overflow-clip relative shrink-0" data-name="Week">
      <BbDatePickerDay21 />
      <BbDatePickerDay22 />
      <BbDatePickerDay23 />
      <BbDatePickerDay24 />
      <BbDatePickerDay25 />
      <BbDatePickerDay26 />
      <BbDatePickerDay27 />
    </div>
  );
}

function BbDatePickerDay28() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">29</p>
      </div>
    </div>
  );
}

function BbDatePickerDay29() {
  return (
    <div className="overflow-clip relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(0,0,0,0.96)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">30</p>
      </div>
    </div>
  );
}

function BbDatePickerDay30() {
  return (
    <div className="relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">31</p>
      </div>
    </div>
  );
}

function BbDatePickerDay31() {
  return (
    <div className="relative rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[40px] text-[18px] text-[rgba(31,2,48,0.3)] text-center top-1/2">
        <p className="leading-[1.3] whitespace-pre-wrap">1</p>
      </div>
    </div>
  );
}

function BbDatePickerDay32() {
  return <div className="overflow-clip rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day" />;
}

function BbDatePickerDay33() {
  return <div className="overflow-clip rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day" />;
}

function BbDatePickerDay34() {
  return <div className="overflow-clip rounded-[64px] shrink-0 size-[44px]" data-name="_BB / Date Picker / Day" />;
}

function Week4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center overflow-clip relative shrink-0" data-name="Week">
      <BbDatePickerDay28 />
      <BbDatePickerDay29 />
      <BbDatePickerDay30 />
      <BbDatePickerDay31 />
      <BbDatePickerDay32 />
      <BbDatePickerDay33 />
      <BbDatePickerDay34 />
    </div>
  );
}

function Month() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0" data-name="Month">
      <Week />
      <Week1 />
      <Week2 />
      <Week3 />
      <Week4 />
    </div>
  );
}

function Wrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Wrapper">
      <Top />
      <Month />
    </div>
  );
}

function MagicDatePicker() {
  return (
    <div className="content-stretch flex flex-col items-center p-[20px] relative shrink-0 w-[375px]" data-name="[Magic] Date Picker">
      <Wrapper />
    </div>
  );
}

function MagicAvatar() {
  return (
    <div className="h-[32px] relative shrink-0 w-[52px]" data-name="[Magic] Avatar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 32">
        <g id="[Magic] Avatar">
          <g id="Icon">
            <path d={svgPaths.p1ba61180} fill="var(--fill-0, #B8B8B8)" id="Icon_2" />
          </g>
          <path d={svgPaths.p3085c640} fill="var(--fill-0, white)" id="Background" />
        </g>
      </svg>
    </div>
  );
}

function Trailing4X() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="_Trailing - 4x2">
      <MagicAvatar />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[32px] items-start justify-center min-h-px min-w-px relative" data-name="Content">
      <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[12px] text-[rgba(0,0,0,0.64)] text-ellipsis tracking-[0.12px] w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">Payments will always be on the 24th of each month.</p>
      </div>
    </div>
  );
}

function Leading1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading">
      <Trailing4X />
      <Content />
    </div>
  );
}

function Wrapper1() {
  return (
    <div className="bg-[#efefef] relative rounded-[24px] shrink-0 w-full" data-name="Wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <Leading1 />
        </div>
      </div>
    </div>
  );
}

function ListRowActionable4X() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="_List Row Actionable (4x2)">
      <Wrapper1 />
    </div>
  );
}

function ActionableLists() {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[16px] shrink-0 w-[327px]" data-name="_Actionable Lists">
      <ListRowActionable4X />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center pb-[24px] pt-[8px] relative shrink-0 w-[375px]" data-name="Header">
      <TopBar />
      <Title />
      <MagicDatePicker />
      <ActionableLists />
    </div>
  );
}

function BottomSheet() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex flex-col h-[714px] items-center left-0 overflow-clip py-[24px] rounded-[40px]" data-name="Bottom Sheet">
      <Header />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#820ad1] bottom-[45px] content-stretch flex gap-[8px] h-[48px] items-end justify-center left-[18px] max-h-[48px] max-w-[359px] min-h-[48px] px-[24px] py-[12px] rounded-[64px] w-[339px]" data-name="Button">
      <div className="flex flex-col font-['Graphik:Medium',sans-serif] justify-center leading-[0] max-w-[295px] not-italic overflow-hidden relative shrink-0 text-[16px] text-center text-ellipsis text-white tracking-[-0.16px] whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">Select date</p>
      </div>
    </div>
  );
}

export default function Simulation() {
  return (
    <div className="bg-[rgba(0,0,0,0)] overflow-clip relative rounded-[40px] size-full" data-name="Simulation06">
      <BottomSheet />
      <Button />
    </div>
  );
}