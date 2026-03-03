import { colors, tokens } from "../../constants";

/**
 * Down Payment Value Screen
 * User defines the down payment amount
 */
export default function DownPaymentValueScreen() {
  return (
    <div 
      className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[40px] size-full p-6" 
      style={{ backgroundColor: colors.neutral.white }}
      data-name="DownPaymentValue"
    >
      <h1 
        className="text-[36px] font-medium text-center mb-4"
        style={{ 
          fontFamily: tokens.fonts.graphik, 
          fontFeatureSettings: tokens.fontFeatures.graphik,
          fontWeight: tokens.fontWeights.medium,
          color: colors.text.primary 
        }}
      >
        Down Payment Value
      </h1>
      <p 
        className="text-[16px] text-center"
        style={{ 
          fontFamily: tokens.fonts.graphik,
          color: colors.text.secondary 
        }}
      >
        Screen placeholder - to be implemented
      </p>
    </div>
  );
}
