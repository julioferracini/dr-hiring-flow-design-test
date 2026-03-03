import svgPaths from "./svg-ap41vbaqvh";

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
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Top Bar">
      <TopBar1 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Header">
      <TopBar />
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pb-[24px] pt-[8px] px-[24px] relative w-full">
          <p className="font-['Graphik:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[20px] text-[rgba(0,0,0,0.96)] tracking-[-0.4px] w-full whitespace-pre-wrap" style={{ fontFeatureSettings: "\'ss05\'" }}>
            Enter your 4-digit PIN
          </p>
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative shrink-0 w-[375px]" data-name="Header">
      <Title />
    </div>
  );
}

function MasterPinCode() {
  return (
    <div className="absolute bg-[#efefef] inset-0 overflow-clip rounded-[32px]" data-name="_Master Pin Code">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Hidden Digit">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <circle cx="8" cy="8" fill="var(--fill-0, black)" fillOpacity="0.96" id="Hidden Digit" r="8" />
        </svg>
      </div>
    </div>
  );
}

function PinInput1() {
  return (
    <div className="bg-white relative shrink-0 size-[48px]" data-name="Pin Input">
      <MasterPinCode />
    </div>
  );
}

function PinInput() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col inset-[0_81.82%_0_0] items-center" data-name="_Pin Input">
      <PinInput1 />
    </div>
  );
}

function MasterPinCode1() {
  return (
    <div className="absolute bg-[#efefef] inset-0 overflow-clip rounded-[32px]" data-name="_Master Pin Code">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8px] top-1/2" data-name="Hidden Digit">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, black)" fillOpacity="0.32" id="Hidden Digit" r="4" />
        </svg>
      </div>
    </div>
  );
}

function PinInput3() {
  return (
    <div className="bg-white relative shrink-0 size-[48px]" data-name="Pin Input">
      <MasterPinCode1 />
    </div>
  );
}

function PinInput2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col inset-[0_54.55%_0_27.27%] items-center" data-name="_Pin Input">
      <PinInput3 />
    </div>
  );
}

function MasterPinCode2() {
  return (
    <div className="absolute bg-[#efefef] inset-0 overflow-clip rounded-[32px]" data-name="_Master Pin Code">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8px] top-1/2" data-name="Hidden Digit">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, black)" fillOpacity="0.32" id="Hidden Digit" r="4" />
        </svg>
      </div>
    </div>
  );
}

function PinInput5() {
  return (
    <div className="bg-white relative shrink-0 size-[48px]" data-name="Pin Input">
      <MasterPinCode2 />
    </div>
  );
}

function PinInput4() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex flex-col items-center left-[54.55%] right-[27.27%] top-1/2" data-name="_Pin Input">
      <PinInput5 />
    </div>
  );
}

function MasterPinCode3() {
  return (
    <div className="absolute bg-[#efefef] inset-0 overflow-clip rounded-[32px]" data-name="_Master Pin Code">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8px] top-1/2" data-name="Hidden Digit">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, black)" fillOpacity="0.32" id="Hidden Digit" r="4" />
        </svg>
      </div>
    </div>
  );
}

function PinInput7() {
  return (
    <div className="bg-white relative shrink-0 size-[48px]" data-name="Pin Input">
      <MasterPinCode3 />
    </div>
  );
}

function PinInput6() {
  return (
    <div className="-translate-y-1/2 absolute bg-white content-stretch flex flex-col items-center left-[81.82%] right-0 top-1/2" data-name="_Pin Input">
      <PinInput7 />
    </div>
  );
}

function DrPinCodeField() {
  return (
    <div className="h-[48px] relative shrink-0 w-[264px]" data-name="DR Pin Code Field">
      <PinInput />
      <PinInput2 />
      <PinInput4 />
      <PinInput6 />
    </div>
  );
}

function HelperTextOptional() {
  return <div className="h-[56px] shrink-0 w-[375px]" data-name="Helper text - Optional" />;
}

function PinCode() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Pin Code">
      <Header1 />
      <DrPinCodeField />
      <HelperTextOptional />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <PinCode />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px overflow-clip relative w-full" data-name="Body">
      <Content />
    </div>
  );
}

function SettingsContainer() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[569px] items-start overflow-clip pb-[32px] relative rounded-[24px] shrink-0 w-full" data-name="Settings container">
      <Header />
      <Body />
    </div>
  );
}

function Key() {
  return <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.35)]" data-name="Key" />;
}

function Frame1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[40px] leading-[0] left-[calc(50%+0.5px)] not-italic text-black text-center top-[calc(50%-3px)] w-[20px] whitespace-nowrap" data-name="Frame">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Bold',sans-serif] justify-center left-1/2 text-[10px] top-[calc(50%+16px)] tracking-[2px]">
        <p className="leading-[normal]">{` `}</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center left-[calc(50%-1px)] text-[25px] top-[calc(50%-5px)]">
        <p className="leading-[normal]">1</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <Key />
      <Frame1 />
    </div>
  );
}

function Key1() {
  return <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.35)]" data-name="Key" />;
}

function Frame2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[40px] leading-[0] left-[calc(50%+0.5px)] not-italic text-black text-center top-[calc(50%-3px)] w-[20px] whitespace-nowrap" data-name="Frame">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Bold',sans-serif] justify-center left-1/2 text-[10px] top-[calc(50%+16px)] tracking-[2px]">
        <p className="leading-[normal]">ABC</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center left-[calc(50%-1px)] text-[25px] top-[calc(50%-5px)]">
        <p className="leading-[normal]">2</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <Key1 />
      <Frame2 />
    </div>
  );
}

function Key2() {
  return <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.35)]" data-name="Key" />;
}

function Frame3() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[40px] leading-[0] left-[calc(50%+0.5px)] not-italic text-black text-center top-[calc(50%-3px)] w-[20px] whitespace-nowrap" data-name="Frame">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Bold',sans-serif] justify-center left-1/2 text-[10px] top-[calc(50%+16px)] tracking-[2px]">
        <p className="leading-[normal]">DEF</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center left-[calc(50%-1px)] text-[25px] top-[calc(50%-5px)]">
        <p className="leading-[normal]">3</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <Key2 />
      <Frame3 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[6px] h-[46px] items-start relative shrink-0 w-[381px]" data-name="Frame">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Key3() {
  return <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.35)]" data-name="Key" />;
}

function Frame5() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[40px] leading-[0] left-[calc(50%+0.5px)] not-italic text-black text-center top-[calc(50%-3px)] w-[20px] whitespace-nowrap" data-name="Frame">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Bold',sans-serif] justify-center left-[calc(50%+0.5px)] text-[10px] top-[calc(50%+16px)] tracking-[2px]">
        <p className="leading-[normal]">GHI</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center left-[calc(50%-0.5px)] text-[25px] top-[calc(50%-5px)]">
        <p className="leading-[normal]">4</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <Key3 />
      <Frame5 />
    </div>
  );
}

function Key4() {
  return <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.35)]" data-name="Key" />;
}

function Frame6() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[40px] leading-[0] left-[calc(50%+0.5px)] not-italic text-black text-center top-[calc(50%-3px)] w-[20px] whitespace-nowrap" data-name="Frame">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Bold',sans-serif] justify-center left-1/2 text-[10px] top-[calc(50%+16px)] tracking-[2px]">
        <p className="leading-[normal]">JKL</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center left-[calc(50%-1px)] text-[25px] top-[calc(50%-5px)]">
        <p className="leading-[normal]">5</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <Key4 />
      <Frame6 />
    </div>
  );
}

function Key5() {
  return <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.35)]" data-name="Key" />;
}

function Frame7() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[40px] leading-[0] left-[calc(50%+0.5px)] not-italic text-black text-center top-[calc(50%-3px)] w-[20px] whitespace-nowrap" data-name="Frame">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Bold',sans-serif] justify-center left-[calc(50%+0.5px)] text-[10px] top-[calc(50%+16px)] tracking-[2px]">
        <p className="leading-[normal]">MNO</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center left-[calc(50%-1px)] text-[25px] top-[calc(50%-5px)]">
        <p className="leading-[normal]">6</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <Key5 />
      <Frame7 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[6px] h-[46px] items-start relative shrink-0 w-[381px]" data-name="Frame">
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Key6() {
  return <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.35)]" data-name="Key" />;
}

function Frame9() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[40px] leading-[0] left-[calc(50%+0.5px)] not-italic text-black text-center top-[calc(50%-3px)] w-[20px] whitespace-nowrap" data-name="Frame">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Bold',sans-serif] justify-center left-[calc(50%+0.5px)] text-[10px] top-[calc(50%+16px)] tracking-[2px]">
        <p className="leading-[normal]">PQRS</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center left-[calc(50%-0.5px)] text-[25px] top-[calc(50%-5px)]">
        <p className="leading-[normal]">7</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <Key6 />
      <Frame9 />
    </div>
  );
}

function Key7() {
  return <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.35)]" data-name="Key" />;
}

function Frame10() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[40px] leading-[0] left-[calc(50%+0.5px)] not-italic text-black text-center top-[calc(50%-3px)] w-[20px] whitespace-nowrap" data-name="Frame">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Bold',sans-serif] justify-center left-1/2 text-[10px] top-[calc(50%+16px)] tracking-[2px]">
        <p className="leading-[normal]">TUV</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center left-[calc(50%-1px)] text-[25px] top-[calc(50%-5px)]">
        <p className="leading-[normal]">8</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <Key7 />
      <Frame10 />
    </div>
  );
}

function Key8() {
  return <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.35)]" data-name="Key" />;
}

function Frame11() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[40px] leading-[0] left-[calc(50%+0.5px)] not-italic text-black text-center top-[calc(50%-3px)] w-[20px] whitespace-nowrap" data-name="Frame">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Bold',sans-serif] justify-center left-1/2 text-[10px] top-[calc(50%+16px)] tracking-[2px]">
        <p className="leading-[normal]">WXYZ</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center left-[calc(50%-1px)] text-[25px] top-[calc(50%-5px)]">
        <p className="leading-[normal]">9</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <Key8 />
      <Frame11 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[6px] h-[46px] items-start relative shrink-0 w-[381px]" data-name="Frame">
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Button9() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Button">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 123 46">
        <g id="Button">
          <path d={svgPaths.p14446d00} fill="var(--fill-0, black)" id="Symbols" />
        </g>
      </svg>
    </div>
  );
}

function Key9() {
  return <div className="absolute bg-white inset-0 rounded-[4.6px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.35)]" data-name="Key" />;
}

function Button10() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <Key9 />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center leading-[0] left-[calc(50%-0.5px)] not-italic text-[25px] text-black text-center top-[calc(50%-1px)] whitespace-nowrap">
        <p className="leading-[normal]">0</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[17.99px] left-[calc(50%+2.54px)] top-[calc(50%-1.01px)] w-[23.983px]" data-name="Symbol">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9825 17.99">
          <path d={svgPaths.pf540300} fill="var(--fill-0, black)" id="Symbol" />
        </svg>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[6px] h-[46px] items-start relative shrink-0 w-[381px]" data-name="Frame">
      <Button9 />
      <Button10 />
      <Button11 />
    </div>
  );
}

function Keyboard() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Keyboard">
      <Frame />
      <Frame4 />
      <Frame8 />
      <Frame12 />
    </div>
  );
}

function KeyboardSuggestion() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Keyboard + Suggestion">
      <Keyboard />
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end pb-[8px] pt-[19px] relative shrink-0 w-full" data-name="Home Indicator">
      <div className="bg-[rgba(0,0,0,0.96)] h-[5px] rounded-[64px] shrink-0 w-[140px]" data-name="Line" />
    </div>
  );
}

function KeyboardNumberOtpSuggestion() {
  return (
    <div className="bg-[#c9cdd5] content-stretch flex flex-col gap-[40px] items-center p-[6px] relative shrink-0 w-[393px]" data-name="Keyboard Number + OTP Suggestion">
      <KeyboardSuggestion />
      <HomeIndicator />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip top-[520px] w-[393px]" data-name="Footer">
      <KeyboardNumberOtpSuggestion />
    </div>
  );
}

export default function Pin() {
  return (
    <div className="bg-[rgba(0,0,0,0)] content-stretch flex flex-col items-start justify-end overflow-clip relative rounded-[40px] size-full" data-name="PIN">
      <SettingsContainer />
      <Footer />
    </div>
  );
}