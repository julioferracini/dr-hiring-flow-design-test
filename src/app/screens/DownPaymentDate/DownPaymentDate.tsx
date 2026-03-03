import { colors, tokens } from "../../constants";

/**
 * Down Payment Date Screen
 * User selects the down payment date
 */
export default function DownPaymentDateScreen() {
  return (
    <div 
      className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[40px] size-full p-6" 
      style={{ backgroundColor: colors.neutral.white }}
      data-name="DownPaymentDate"
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
        Down Payment Date
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
