import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "motion/react";

interface IOSBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: "small" | "medium" | "large" | "auto";
  enableSwipeDown?: boolean;
  showHandle?: boolean;
  className?: string;
  adjustForKeyboard?: boolean;
}

export default function IOSBottomSheet({
  isOpen,
  onClose,
  children,
  height = "medium",
  enableSwipeDown = true,
  showHandle = true,
  className = "",
  adjustForKeyboard = false,
}: IOSBottomSheetProps) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  useEffect(() => {
    if (!adjustForKeyboard) return;

    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const diff = windowHeight - viewportHeight;
        setKeyboardHeight(diff > 0 ? diff : 0);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
      handleResize();

      return () => {
        window.visualViewport?.removeEventListener('resize', handleResize);
        window.visualViewport?.removeEventListener('scroll', handleResize);
      };
    }
  }, [adjustForKeyboard]);
  
  const getHeightClass = () => {
    switch (height) {
      case "small":
        return "35%";
      case "medium":
        return "45%";
      case "large":
        return "60%";
      case "auto":
        return "auto";
      default:
        return "45%";
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (enableSwipeDown && info.offset.y > 100) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-end justify-center rounded-[40px] overflow-hidden pointer-events-none">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Bottom Sheet Container */}
          <div className="relative w-full pointer-events-none" style={{ height: getHeightClass() }}>
            <motion.div
              className={`absolute inset-0 bg-white rounded-t-[32px] shadow-[0px_-2px_20px_rgba(0,0,0,0.1)] overflow-hidden pointer-events-auto ${className}`}
              initial={{ y: "100%" }}
              animate={{ 
                y: adjustForKeyboard ? -keyboardHeight : 0 
              }}
              exit={{ y: "100%" }}
              transition={{ 
                type: "spring", 
                stiffness: 350, 
                damping: 35,
                mass: 0.9
              }}
              drag={enableSwipeDown ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={handleDragEnd}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background extension below - fills space when keyboard is active */}
              <div className="absolute inset-x-0 top-full h-[200vh] bg-white" />
              
              {/* Handle Bar */}
              {showHandle && (
                <div className="flex justify-center pt-[10px] pb-[6px] cursor-grab active:cursor-grabbing">
                  <div className="w-[36px] h-[5px] bg-black/20 rounded-full" />
                </div>
              )}

              {/* Content */}
              <div 
                className="overflow-y-auto px-0" 
                style={{ 
                  height: showHandle ? 'calc(100% - 21px)' : '100%',
                  maxHeight: showHandle ? 'calc(100% - 21px)' : '100%'
                }}
              >
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}