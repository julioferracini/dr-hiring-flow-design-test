import { motion } from "motion/react";
import { tokens } from "../constants";

export interface OfferBoxProps {
  variant?: "normal" | "highlighted";
  badge?: string;
  badgeColor?: "purple" | "green";
  title: string;
  paymentInfo: string;
  benefitText: string;
  benefitColor?: "green" | "purple";
  buttonText: string;
  onButtonClick: () => void;
}

export default function OfferBox({
  variant = "normal",
  badge,
  badgeColor = "purple",
  title,
  paymentInfo,
  benefitText,
  benefitColor = "green",
  buttonText,
  onButtonClick,
}: OfferBoxProps) {
  const isHighlighted = variant === "highlighted";

  const bgColor = isHighlighted ? "bg-[#faf6ff]" : "bg-white";
  const borderColor = isHighlighted ? "border-[#d2a5ff]" : "border-[#e5e5e5]";
  const buttonBg = isHighlighted ? "bg-[#820ad1]" : "bg-white";
  const buttonText_Color = isHighlighted ? "text-white" : "text-[#1f0230]";
  const buttonShadow = isHighlighted
    ? "shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.08),inset_0px_-1px_0px_0px_rgba(31,2,48,0.46)]"
    : "shadow-[inset_0px_-1px_0px_0px_rgba(31,0,47,0.1),inset_0px_0px_0px_1px_rgba(31,0,47,0.02)]";

  const badgeBg =
    badgeColor === "purple" ? "bg-[#f6ecff]" : "bg-[#ddf5e5]";
  const badgeTextColor =
    badgeColor === "purple" ? "text-[#820ad1]" : "text-[#0c7a3a]";

  const benefitTextColor =
    benefitColor === "green" ? "text-[#0c7a3a]" : "text-[#820ad1]";

  return (
    <motion.div
      className={`${bgColor} relative rounded-[24px] w-full`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        {/* Top Section */}
        <div className="relative w-full">
          <div className="flex flex-col items-center size-full">
            <div className="content-stretch flex flex-col items-center p-[20px] relative w-full">
              <div className="content-stretch flex gap-[12px] items-start relative w-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">
                  {/* Badge */}
                  {badge && (
                    <div
                      className={`${badgeBg} content-stretch flex items-center justify-center max-w-[359px] min-h-[20px] overflow-clip px-[8px] py-[2px] relative rounded-[8px]`}
                    >
                      <p
                        className={`flex-[1_0_0] font-semibold leading-[1.3] min-h-px min-w-px not-italic overflow-hidden relative ${badgeTextColor} text-[12px] text-center text-ellipsis tracking-[0.12px] whitespace-nowrap`}
                        style={{ fontFamily: tokens.fonts.nuSans }}
                      >
                        {badge}
                      </p>
                    </div>
                  )}

                  {/* Title */}
                  <p
                    className="font-medium leading-[1.2] min-w-full not-italic overflow-hidden relative text-[#1f002f] text-[20px] text-ellipsis tracking-[-0.4px] w-[min-content] whitespace-pre-wrap"
                    style={{ fontFeatureSettings: "'ss05'", fontFamily: tokens.fonts.graphik }}
                  >
                    {title}
                  </p>

                  {/* Payment Info */}
                  <div className="content-stretch flex gap-[4px] items-start leading-[1.3] not-italic relative text-[12px] text-ellipsis">
                    <span
                      className="font-normal overflow-hidden relative text-[rgba(0,0,0,0.64)]"
                      style={{ fontFeatureSettings: "'lnum', 'tnum'", fontFamily: tokens.fonts.graphik }}
                    >
                      {paymentInfo.split(" ")[0]}{" "}
                      {paymentInfo.split(" ")[1] || ""}
                    </span>
                    <span
                      className="font-medium overflow-hidden relative text-[rgba(0,0,0,0.96)]"
                      style={{ fontFeatureSettings: "'lnum', 'tnum'", fontFamily: tokens.fonts.graphik }}
                    >
                      {paymentInfo.split(" ").slice(2).join(" ")}
                    </span>
                  </div>

                  {/* Benefit Text */}
                  <p
                    className={`font-medium leading-[1.3] not-italic overflow-hidden relative ${benefitTextColor} text-[12px] text-ellipsis`}
                    style={{ fontFeatureSettings: "'lnum', 'tnum'", fontFamily: tokens.fonts.graphik }}
                  >
                    {benefitText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Button */}
        <div className="relative w-full">
          <div className="flex flex-col justify-end size-full">
            <div className="content-stretch flex flex-col items-start justify-end pb-[12px] px-[12px] relative w-full">
              <motion.button
                className={`${buttonBg} h-[36px] max-h-[40px] min-h-[36px] relative rounded-[64px] w-full ${ 
                  isHighlighted ? "" : buttonShadow
                }`}
                onClick={onButtonClick}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                <div className="content-stretch flex gap-[4px] items-center justify-center max-h-[inherit] overflow-clip px-[16px] relative rounded-[inherit] size-full">
                  <p
                    className={`font-semibold leading-[1.3] not-italic overflow-hidden relative ${buttonText_Color} text-[12px] text-center text-ellipsis tracking-[0.12px] whitespace-nowrap`}
                    style={{ fontFamily: tokens.fonts.nuSans }}
                  >
                    {buttonText}
                  </p>
                </div>
                {isHighlighted && (
                  <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.08),inset_0px_-1px_0px_0px_rgba(31,2,48,0.46)]" />
                )}
                {!isHighlighted && (
                  <div
                    aria-hidden="true"
                    className="absolute border border-[rgba(31,2,48,0.08)] border-solid inset-0 pointer-events-none rounded-[64px] shadow-[0px_1px_0px_0px_rgba(31,0,47,0.05)]"
                  />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`absolute ${borderColor} border-[0.5px] border-solid inset-0 pointer-events-none rounded-[24px]`}
      />
    </motion.div>
  );
}