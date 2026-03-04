import { motion } from "motion/react";
import { colors, tokens } from "../../constants";
import { ScreenNavBar } from "../../components/ScreenNavBar";
import BottomActionBar from "../../components/BottomActionBar";
import { useTranslation } from "../../i18n/context";
interface TermsConditionsProps {
  onBack?: () => void;
  onConfirm?: () => void;
}

function TopBar({ onBack }: { onBack?: () => void }) {
  const { t } = useTranslation();
  return <ScreenNavBar variant="back" onAction={onBack} title={t('terms.title')} />;
}

function MagicTopBar({ onBack }: { onBack?: () => void }) {
  return (
    <div className="bg-[rgba(255,255,255,0.67)] backdrop-blur-md content-stretch flex flex-col items-center relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full" data-name="[Magic] Top Bar">
      <TopBar onBack={onBack} />
    </div>
  );
}

function TermsContent() {
  const { t, translations } = useTranslation();
  const paragraphs = translations.terms.paragraphs;

  return (
    <div className="px-[24px] pb-[140px] w-full">
      {/* Heading + subtitle — now scrollable */}
      <motion.div
        className="flex flex-col gap-[8px] pb-[24px] pt-[8px] w-full whitespace-pre-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p
          className="leading-[1.2] text-[28px] tracking-[-0.84px] w-full"
          style={{ fontFamily: tokens.fonts.graphik, fontWeight: 600, fontFeatureSettings: "'ss05'", color: colors.text.primary }}
        >
          {t('terms.heading')}
        </p>
        <p
          className="leading-[1.3] text-[18px] tracking-[-0.18px] w-full"
          style={{ fontFamily: tokens.fonts.graphik, fontWeight: 400, fontFeatureSettings: "'ss05'", color: colors.text.primary }}
        >
          {t('terms.bodySubtitle')}
        </p>
      </motion.div>

      <div className="flex flex-col gap-[12px]">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="leading-[1.5] text-[16px] tracking-[-0.16px]"
            style={{
              fontFamily: tokens.fonts.graphik,
              fontWeight: p.bold ? 700 : 400,
              fontFeatureSettings: "'ss05'",
              color: colors.text.primary,
            }}
          >
            {p.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function TermsConditions({ onBack, onConfirm }: TermsConditionsProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-white content-stretch flex flex-col relative rounded-[40px] size-full overflow-hidden" data-name="Terms & Conditions">
      <MagicTopBar onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-[120px]">
        <TermsContent />
      </div>
      <BottomActionBar
        buttonLabel={t('terms.confirmButton')}
        onAction={onConfirm}
        immediate={true}
      />
    </div>
  );
}