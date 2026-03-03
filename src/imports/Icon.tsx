import svgPaths from "./svg-ojoe6yyi6u";

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
    <div className="absolute content-stretch flex items-center left-0 top-0" data-name="_Trailing - 4x2">
      <MagicAvatar />
    </div>
  );
}

export default function Icon() {
  return (
    <div className="relative size-full" data-name="icon">
      <Trailing4X />
    </div>
  );
}