import svgPaths from "./svg-luu5soj06n";

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
          <p className="font-['Graphik:Medium',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[36px] text-[rgba(0,0,0,0.96)] tracking-[-1.08px] w-full whitespace-pre-wrap" style={{ fontFeatureSettings: "'ss05'" }}>{`Qual o melhor  plano de parcelas?`}</p>
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

function Text() {
  return (
    <div className="content-stretch flex font-['Graphik:Medium',sans-serif] gap-[12px] items-center leading-[0] not-italic overflow-clip relative shrink-0 text-[28px] tracking-[-0.84px] whitespace-nowrap" data-name="Text">
      <div className="flex flex-col justify-center relative shrink-0 text-[rgba(0,0,0,0.64)]" style={{ fontFeatureSettings: "'ss05'" }}>
        <p className="leading-[1.2]">$</p>
      </div>
      <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[rgba(0,0,0,0.96)] text-ellipsis" style={{ fontFeatureSettings: "'ss05'" }}>
        <p className="leading-[1.2] overflow-hidden">200.00</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-px items-center overflow-clip relative shrink-0" data-name="Content">
      <Text />
    </div>
  );
}

function LeftWrap() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end min-h-px min-w-px overflow-clip relative" data-name="Left Wrap">
      <Content1 />
    </div>
  );
}

function Trailing() {
  return <div className="content-stretch flex flex-col items-start min-w-[40px] shrink-0 size-[40px]" data-name="Trailing" />;
}

function ContentArea() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Content area">
      <LeftWrap />
      <Trailing />
    </div>
  );
}

function MoneyInput() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[327px]" data-name="Money Input">
      <ContentArea />
      <div className="content-stretch flex gap-[16px] items-center not-italic py-[8px] relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] w-[327px]" data-name="Bottom Type">
        <div className="flex flex-[1_0_0] flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px relative" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
          <p className="leading-[1.3] whitespace-pre-wrap">Seu valor alvo</p>
        </div>
        <p className="font-['Graphik:Regular',sans-serif] leading-[1.3] relative shrink-0 text-right tracking-[-0.14px]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
          0 / 10
        </p>
      </div>
    </div>
  );
}

function DividerContainer() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 right-0" data-name="Divider container">
      <div className="bg-[rgba(31,2,48,0.08)] h-px relative shrink-0 w-full" data-name="Bottom divider">
        <div className="-translate-y-1/2 absolute h-0 left-0 right-0 top-[calc(50%+0.5px)]" data-name="Line">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 343 1">
              <line id="Line" stroke="var(--stroke-0, #1F0230)" strokeOpacity="0.08" x2="343" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListGroup() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-[343px]" data-name="List Group">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="bg-[#f6ecff] relative shrink-0 w-full" data-name="[Magic] List Row Actionable">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[12px] items-center p-[16px] relative w-full">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px not-italic overflow-clip relative text-ellipsis" data-name="Content">
                <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center leading-[0] overflow-hidden relative shrink-0 text-[#1f002f] text-[14px] w-full" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                  <p className="leading-[1.3] whitespace-pre-wrap">6 parcelas de R$ 201,96</p>
                </div>
                <div className="flex flex-col font-['Graphik:Regular',sans-serif] justify-center leading-[1.3] overflow-hidden relative shrink-0 text-[#0c7a3a] text-[12px] w-full whitespace-pre-wrap" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                  <p className="mb-0">{`R$ 377,74 de desconto `}</p>
                  <p>Total: R$ 1.211,76</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-end max-w-[144px] overflow-clip relative shrink-0" data-name="Secondary">
                <div className="bg-[#ecd9ff] content-stretch flex items-center justify-center max-w-[359px] min-h-[20px] overflow-clip px-[8px] py-[2px] relative rounded-[8px] shrink-0 w-[47px]" data-name="[Magic] Badge">
                  <p className="flex-[1_0_0] font-['Nu_Sans_Text:Semibold',sans-serif] leading-[1.3] min-h-px min-w-px not-italic overflow-hidden relative text-[#820ad1] text-[12px] text-center text-ellipsis tracking-[0.12px] whitespace-nowrap" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                    Sob medida
                  </p>
                </div>
              </div>
              <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Action">
                <div className="relative shrink-0 size-[20px]" data-name="[Magic] outlined/ui actions/navigation/chevron">
                  <div className="absolute flex inset-[23.71%_34.99%_24.57%_34.99%] items-center justify-center">
                    <div className="-rotate-90 flex-none h-[6.006px] w-[10.345px]">
                      <div className="relative size-full" data-name="Icon">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3452 6.00592">
                          <path d={svgPaths.ped7e100} fill="var(--fill-0, #1F002F)" fillOpacity="0.6" id="Icon" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DividerContainer />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-[-1px] pointer-events-none rounded-[25px]" />
    </div>
  );
}

function List() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[12px] items-center py-[12px] relative shrink-0 w-full" data-name="List">
      <ListGroup />
    </div>
  );
}

function DividerContainer1() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 right-0" data-name="Divider container">
      <div className="bg-[rgba(31,2,48,0.08)] h-px relative shrink-0 w-full" data-name="Bottom divider">
        <div className="-translate-y-1/2 absolute h-0 left-0 right-0 top-[calc(50%+0.5px)]" data-name="Line">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 343 1">
              <line id="Line" stroke="var(--stroke-0, #1F0230)" strokeOpacity="0.08" x2="343" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function DividerContainer2() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 right-0" data-name="Divider container">
      <div className="bg-[rgba(31,2,48,0.08)] h-px relative shrink-0 w-full" data-name="Bottom divider">
        <div className="-translate-y-1/2 absolute h-0 left-0 right-0 top-[calc(50%+0.5px)]" data-name="Line">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 343 1">
              <line id="Line" stroke="var(--stroke-0, #1F0230)" strokeOpacity="0.08" x2="343" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function DividerContainer3() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 right-0" data-name="Divider container">
      <div className="bg-[rgba(31,2,48,0.08)] h-px relative shrink-0 w-full" data-name="Bottom divider">
        <div className="-translate-y-1/2 absolute h-0 left-0 right-0 top-[calc(50%+0.5px)]" data-name="Line">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 343 1">
              <line id="Line" stroke="var(--stroke-0, #1F0230)" strokeOpacity="0.08" x2="343" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListGroup1() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-[343px]" data-name="List Group">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="bg-white relative shrink-0 w-full" data-name="[Magic] List Row Actionable">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[12px] items-center p-[16px] relative w-full">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center leading-[0] min-h-px min-w-px not-italic overflow-clip relative text-ellipsis" data-name="Content">
                <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center overflow-hidden relative shrink-0 text-[#1f002f] text-[14px] w-full" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                  <p className="leading-[1.3] whitespace-pre-wrap">10 parcelas de R$ 127,36</p>
                </div>
                <div className="flex flex-col font-['Graphik:Regular',sans-serif] font-['Nu_Sans_Text:Regular',sans-serif] justify-center overflow-hidden relative shrink-0 text-[0px] text-[12px] text-[rgba(31,0,47,0.6)] w-full whitespace-pre-wrap">
                  <p className="mb-0 text-[14px]">
                    <span className="leading-[1.3] text-[#0c7a3a]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                      R$ 315,90 de desconto
                    </span>
                    <span className="leading-[1.3] text-[rgba(0,0,0,0.64)]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>{` `}</span>
                  </p>
                  <p className="leading-[1.3] text-[rgba(0,0,0,0.64)]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                    Total: R$ 1.273,60
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip shrink-0" data-name="Secondary" />
              <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Action">
                <div className="relative shrink-0 size-[20px]" data-name="[Magic] outlined/ui actions/navigation/chevron">
                  <div className="absolute flex inset-[23.71%_34.99%_24.57%_34.99%] items-center justify-center">
                    <div className="-rotate-90 flex-none h-[6.006px] w-[10.345px]">
                      <div className="relative size-full" data-name="Icon">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3452 6.00592">
                          <path d={svgPaths.ped7e100} fill="var(--fill-0, #1F002F)" fillOpacity="0.6" id="Icon" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DividerContainer1 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="[Magic] List Row Actionable">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[12px] items-center p-[16px] relative w-full">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center leading-[0] min-h-px min-w-px not-italic overflow-clip relative text-ellipsis" data-name="Content">
                <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center overflow-hidden relative shrink-0 text-[#1f002f] text-[14px] w-full" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                  <p className="leading-[1.3] whitespace-pre-wrap">14 parcelas de R$ 95,25</p>
                </div>
                <div className="flex flex-col font-['Graphik:Regular',sans-serif] font-['Nu_Sans_Text:Regular',sans-serif] justify-center overflow-hidden relative shrink-0 text-[0px] text-[12px] text-[rgba(31,0,47,0.6)] w-full whitespace-pre-wrap">
                  <p className="mb-0 text-[14px]">
                    <span className="leading-[1.3] text-[#0c7a3a]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                      R$ 256,00 de desconto
                    </span>
                    <span className="leading-[1.3] text-[rgba(0,0,0,0.64)]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>{` `}</span>
                  </p>
                  <p className="leading-[1.3] text-[rgba(0,0,0,0.64)]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                    Total: R$ 1.333,50
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip shrink-0" data-name="Secondary" />
              <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Action">
                <div className="relative shrink-0 size-[20px]" data-name="[Magic] outlined/ui actions/navigation/chevron">
                  <div className="absolute flex inset-[23.71%_34.99%_24.57%_34.99%] items-center justify-center">
                    <div className="-rotate-90 flex-none h-[6.006px] w-[10.345px]">
                      <div className="relative size-full" data-name="Icon">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3452 6.00592">
                          <path d={svgPaths.ped7e100} fill="var(--fill-0, #1F002F)" fillOpacity="0.6" id="Icon" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DividerContainer2 />
            </div>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full" data-name="[Magic] List Row Actionable">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[12px] items-center p-[16px] relative w-full">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center leading-[0] min-h-px min-w-px not-italic overflow-clip relative text-ellipsis" data-name="Content">
                <div className="flex flex-col font-['Nu_Sans_Text:Semibold',sans-serif] justify-center overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] w-full" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                  <p className="leading-[1.3] whitespace-pre-wrap">Mais opções</p>
                </div>
                <div className="flex flex-col font-['Nu_Sans_Text:Regular',sans-serif] justify-center overflow-hidden relative shrink-0 text-[12px] text-[rgba(31,0,47,0.6)] tracking-[0.12px] w-full" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>
                  <p className="leading-[1.3] whitespace-pre-wrap">até 60 parcelas</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-end max-w-[144px] overflow-clip shrink-0" data-name="Secondary" />
              <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="Action">
                <div className="relative shrink-0 size-[20px]" data-name="[Magic] outlined/ui actions/navigation/chevron">
                  <div className="absolute flex inset-[23.71%_34.99%_24.57%_34.99%] items-center justify-center">
                    <div className="-rotate-90 flex-none h-[6.006px] w-[10.345px]">
                      <div className="relative size-full" data-name="Icon">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3452 6.00592">
                          <path d={svgPaths.ped7e100} fill="var(--fill-0, #1F002F)" fillOpacity="0.6" id="Icon" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DividerContainer3 />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-[-1px] pointer-events-none rounded-[25px]" />
    </div>
  );
}

function List1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[12px] items-center py-[12px] relative shrink-0 w-full" data-name="List">
      <ListGroup1 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Graphik:Medium',sans-serif] leading-[1.3] not-italic overflow-hidden relative shrink-0 text-[16px] text-[rgba(0,0,0,0.96)] text-ellipsis tracking-[-0.16px]" style={{ fontFeatureSettings: "'lnum', 'tnum'" }}>{`What happens if I can't pay?`}</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[209px]" data-name="Content">
      <Content3 />
    </div>
  );
}

function FaqBanner() {
  return (
    <div className="bg-[#efefef] relative rounded-[24px] shrink-0 w-full" data-name="FAQ-banner">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative w-full">
          <Content2 />
          <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Trailing">
            <div className="content-stretch flex gap-[8px] isolate items-center relative rounded-[64px] shrink-0" data-name="[Magic] Avatar">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2 z-[2]" data-name="Icon">
                <div className="absolute inset-[8.33%_7.69%_8.33%_8.97%]" data-name="Icon">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
                    <g id="Icon">
                      <path d={svgPaths.p3d73a000} fill="var(--fill-0, black)" fillOpacity="0.96" />
                      <path d={svgPaths.p1373d100} fill="var(--fill-0, black)" fillOpacity="0.96" />
                      <path d={svgPaths.p2da05800} fill="var(--fill-0, black)" fillOpacity="0.96" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="relative shrink-0 size-[40px] z-[1]" data-name="Background">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                  <path d={svgPaths.pc0b0400} fill="var(--fill-0, #E1E1E1)" id="Background" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Alert() {
  return (
    <div className="relative shrink-0 w-full" data-name="Alert">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center px-[20px] py-[24px] relative w-full">
          <FaqBanner />
        </div>
      </div>
    </div>
  );
}

function GroupList() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[375px]" data-name="Group List">
      <List />
      <List1 />
      <Alert />
    </div>
  );
}

function DoubleInput() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-center py-[24px] relative shrink-0 w-[375px]" data-name="Double Input">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[327px]" data-name="Input">
        <MoneyInput />
      </div>
      <GroupList />
    </div>
  );
}

export default function Conditions() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip pb-[16px] relative rounded-[40px] size-full" data-name="Conditions">
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-[375px]" data-name="[Magic] Header">
        <Content />
      </div>
      <DoubleInput />
      <div className="absolute content-stretch flex flex-col items-center justify-end left-0 pb-[8px] pt-[19px] right-0 top-[852px]" data-name="Home Indicator">
        <div className="bg-[rgba(0,0,0,0.32)] h-[5px] rounded-[64px] shrink-0 w-[140px]" data-name="Line" />
      </div>
    </div>
  );
}