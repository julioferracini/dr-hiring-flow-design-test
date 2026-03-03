import svgPaths from "./svg-gniw4ue9fc";

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
        <p className="leading-[1.3] overflow-hidden">Terms and conditions</p>
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

function TopBar1() {
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
      <TopBar1 />
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Top Bar">
      <MagicTopBar />
    </div>
  );
}

function TitleEnglish() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start not-italic overflow-clip pb-[24px] pt-[8px] px-[24px] relative shrink-0 text-[rgba(0,0,0,0.96)] w-[375px] whitespace-pre-wrap" data-name="Title - English">
      <p className="font-['Graphik:Medium',sans-serif] leading-[1.2] relative shrink-0 text-[28px] tracking-[-0.84px] w-full" style={{ fontFeatureSettings: "\'ss05\'" }}>
        Important information
      </p>
      <p className="font-['Graphik:Regular',sans-serif] leading-[1.3] relative shrink-0 text-[18px] tracking-[-0.18px] w-full" style={{ fontFeatureSettings: "\'ss05\'" }}>
        By confirming the renegotiation, you agree to pay monthly installments plus interest and IOF (tax on financial transactions), as informed on the previous screen.
      </p>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Header">
      <TopBar />
      <TitleEnglish />
    </div>
  );
}

function AutolayoutBlock() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-center left-0 top-0 w-[375px]" data-name="autolayout block">
      <Header />
      <div className="font-['Graphik:Regular',sans-serif] h-[1869px] leading-[0] not-italic relative shrink-0 text-[0px] text-[rgba(0,0,0,0.96)] tracking-[-0.16px] w-[327px] whitespace-pre-wrap" style={{ fontFeatureSettings: "\'ss05\'" }}>
        <p className="font-['Graphik:Medium',sans-serif] leading-[1.3] mb-0 text-[18px] tracking-[-0.18px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          Regarding the payment of installments
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          The installments of your renegotiated debt will be automatically debited from your Nubank account for the duration of the renegotiation.
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          Therefore, remember to ensure you have enough funds in your account balance before the due date. You can deposit money into your Nubank account through:
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          PIX: Until 5 PM on the due date of the installment;
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          TED: Until 5 PM on the due date of the installment.
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          DOC: Until 5 PM on the day before the installment due date.
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          BOLETO: Up to 3 business days before the installment due date.
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="font-['Graphik:Medium',sans-serif] leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          Late payments, interest, and penalties
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          If your Nubank account has insufficient funds on the due date, your installment will be overdue the following day. Therefore, in addition to the normal installment amount, you will pay:
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          - Daily accumulated interest at the same value shown on the previous screen;
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          - Late payment interest of 1% per month; - Penalty of 2% on the overdue installment + IOF (Tax on Financial Operations).
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          It is important to remember that your CPF (Brazilian tax identification number) may be registered with credit protection agencies such as Serasa and SPC, so try to keep your installments up to date.
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="font-['Graphik:Medium',sans-serif] leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          Advance payments
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          You can advance payments or pay off the entire renegotiation at any time. In these cases, interest rates are always proportional.
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          Credit Card
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          Accepting this renegotiation does not guarantee you will get your credit card back.
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          Information Inquiry
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>{`By accepting this contract, you authorize your name to be consulted in the Central Bank's Credit Information System (SCR).`}</p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] mb-0 text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          This was a summary of the most important points. You can read the complete contract at this link: Contract - Renegotiation.
        </p>
        <p className="leading-[1.3] mb-0 text-[16px]">&nbsp;</p>
        <p className="leading-[1.5] text-[16px]" style={{ fontFeatureSettings: "\'ss05\'" }}>
          In any case, as soon as you finalize the renegotiation, the complete contract will be sent to your email.
        </p>
      </div>
    </div>
  );
}

function CollTermsConditions() {
  return (
    <div className="absolute bg-white h-[2165px] left-0 overflow-clip top-0 w-[375px]" data-name="Coll • Terms & conditions">
      <AutolayoutBlock />
    </div>
  );
}

function Divider() {
  return <div className="bg-[#efefef] h-[2px] shrink-0 w-full" data-name="Divider" />;
}

function Button() {
  return (
    <div className="bg-[#820ad1] content-stretch flex gap-[8px] h-[48px] items-center justify-center max-h-[48px] min-h-[48px] px-[24px] py-[12px] relative rounded-[64px] shrink-0 w-[335px]" data-name="Button">
      <div className="flex flex-col font-['Graphik:Medium',sans-serif] justify-center leading-[0] max-w-[295px] not-italic overflow-hidden relative shrink-0 text-[16px] text-center text-ellipsis text-white tracking-[-0.16px] whitespace-nowrap" style={{ fontFeatureSettings: "\'lnum\', \'tnum\'" }}>
        <p className="leading-[1.3] overflow-hidden">Confirmar renegociação</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center py-[16px] relative shrink-0" data-name="content">
      <Button />
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end pb-[8px] pt-[19px] relative shrink-0 w-[375px]" data-name="Home Indicator">
      <div className="bg-[rgba(0,0,0,0.32)] h-[5px] rounded-[64px] shrink-0 w-[140px]" data-name="Line" />
    </div>
  );
}

function BottomWrapper() {
  return (
    <div className="absolute backdrop-blur-[8px] bg-[rgba(255,255,255,0.84)] bottom-0 content-stretch flex flex-col items-center justify-center left-0 w-[375px]" data-name="Bottom Wrapper">
      <Divider />
      <Content />
      <HomeIndicator />
    </div>
  );
}

export default function TermsConditionsEn() {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] size-full" data-name="Terms & Conditions EN">
      <CollTermsConditions />
      <BottomWrapper />
    </div>
  );
}