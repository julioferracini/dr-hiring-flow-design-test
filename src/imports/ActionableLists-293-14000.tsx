import svgPaths from "./svg-24gfzznd2g";

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

function Leading() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading">
      <Trailing4X />
      <Content />
    </div>
  );
}

function Wrapper() {
  return (
    <div className="bg-[#efefef] relative rounded-[24px] shrink-0 w-full" data-name="Wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative w-full">
          <Leading />
        </div>
      </div>
    </div>
  );
}

function ListRowActionable4X() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="_List Row Actionable (4x2)">
      <Wrapper />
    </div>
  );
}

export default function ActionableLists() {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[16px] size-full" data-name="_Actionable Lists">
      <ListRowActionable4X />
    </div>
  );
}