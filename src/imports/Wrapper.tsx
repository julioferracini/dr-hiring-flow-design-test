import svgPaths from "./svg-jb6igx72th";

function MagicIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="[Magic] Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="[Magic] Icon">
          <path d={svgPaths.p346b4600} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function IconAction() {
  return (
    <div className="bg-[rgba(31,2,48,0.3)] content-stretch flex items-center justify-center relative rounded-[64px] shrink-0 size-[32px]" data-name="Icon Action">
      <MagicIcon />
    </div>
  );
}

function MagicIconAction() {
  return (
    <div className="content-stretch flex items-center max-h-[48px] max-w-[48px] min-h-[48px] min-w-[48px] p-[8px] relative rounded-[64px] shrink-0" data-name="[Magic] Icon Action">
      <IconAction />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[32px] items-start justify-center min-h-px min-w-px relative" data-name="Content">
      <div className="flex flex-col font-['Graphik:Regular',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.64)] text-ellipsis tracking-[-0.14px] w-full" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] whitespace-pre-wrap">Payments will always be on the 24th of each month.</p>
      </div>
    </div>
  );
}

function Leading() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Leading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pr-[8px] relative w-full">
          <MagicIconAction />
          <Content />
        </div>
      </div>
    </div>
  );
}

export default function Wrapper() {
  return (
    <div className="bg-[#efefef] content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[24px] size-full" data-name="Wrapper">
      <Leading />
    </div>
  );
}