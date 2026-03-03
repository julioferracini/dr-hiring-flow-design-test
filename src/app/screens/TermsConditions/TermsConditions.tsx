import { motion } from "motion/react";
import { colors, tokens } from "../../constants";
import { ScreenNavBar } from "../../components/ScreenNavBar";
import BottomActionBar from "../../components/BottomActionBar";
import { useTranslation } from "../../i18n/context";

interface TermsConditionsProps {
  onBack?: () => void;
  onConfirm?: () => void;
}

function StatusBar() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Status Bar">
      <div className="content-stretch flex items-start justify-between pb-[10px] pl-[32px] pr-[24px] pt-[18px] relative size-full">
        {/* Empty - spacing only */}
      </div>
    </div>
  );
}

function TopBar({ onBack }: { onBack?: () => void }) {
  const { t } = useTranslation();
  return <ScreenNavBar variant="back" onAction={onBack} title={t('terms.title')} />;
}

function MagicTopBar({ onBack }: { onBack?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-center relative rounded-tl-[32px] rounded-tr-[32px] shrink-0 w-full" data-name="[Magic] Top Bar">
      <StatusBar />
      <TopBar onBack={onBack} />
    </div>
  );
}

function Header({ onBack }: { onBack?: () => void }) {
  const { t } = useTranslation();
  return (
    <motion.div
      className="bg-white content-stretch flex flex-col items-center relative shrink-0 w-full"
      data-name="Header"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <MagicTopBar onBack={onBack} />
      <div className="content-stretch flex flex-col gap-[8px] items-start not-italic overflow-clip pb-[24px] pt-[8px] px-[24px] relative shrink-0 w-full whitespace-pre-wrap">
        <p
          className="leading-[1.2] relative shrink-0 text-[28px] tracking-[-0.84px] w-full"
          style={{ fontFamily: tokens.fonts.graphik, fontWeight: 500, fontFeatureSettings: "'ss05'", color: colors.text.primary }}
        >
          {t('terms.heading')}
        </p>
        <p
          className="leading-[1.3] relative shrink-0 text-[18px] tracking-[-0.18px] w-full"
          style={{ fontFamily: tokens.fonts.graphik, fontWeight: 400, fontFeatureSettings: "'ss05'", color: colors.text.primary }}
        >
          {t('terms.bodySubtitle')}
        </p>
      </div>
    </motion.div>
  );
}

function TermsContent() {
  const { translations } = useTranslation();
  const paragraphs = translations.terms.paragraphs;

  return (
    <div className="px-[24px] pb-[140px] w-full">
      <div className="flex flex-col gap-[12px]">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="leading-[1.5] text-[16px] tracking-[-0.16px]"
            style={{
              fontFamily: tokens.fonts.graphik,
              fontWeight: p.bold ? 500 : 400,
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
      <div className="flex-1 overflow-y-auto pb-[120px]">
        <Header onBack={onBack} />
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