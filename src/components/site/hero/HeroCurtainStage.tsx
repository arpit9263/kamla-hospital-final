import { AnimatePresence, motion } from "framer-motion";
import type { Slide } from "./data";

type Props = {
  currentSlide: Slide;
  previousSlide: Slide | null;
  transitionId: number;
  reduceMotion: boolean;
};

const HeroCurtainStage = ({ currentSlide, previousSlide, transitionId, reduceMotion }: Props) => {
  // Alternate Ken Burns direction per slide for variety
  const variants = [
    { from: { scale: 1.08, x: "-1%", y: "0%" }, to: { scale: 1.0, x: "0%", y: "0%" } },
    { from: { scale: 1.0, x: "0%", y: "0%" }, to: { scale: 1.08, x: "1%", y: "-1%" } },
    { from: { scale: 1.05, x: "1%", y: "1%" }, to: { scale: 1.0, x: "0%", y: "0%" } },
    { from: { scale: 1.0, x: "0%", y: "0%" }, to: { scale: 1.06, x: "-1%", y: "1%" } },
  ];
  const idx = Math.abs(transitionId) % variants.length;
  const v = variants[idx];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Previous slide fades out with a slight scale-down */}
      <AnimatePresence initial={false}>
        {previousSlide && (
          <motion.div
            key={`prev-${transitionId}`}
            className="absolute inset-0"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            <img
              src={previousSlide.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-foreground/30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current slide enters with Ken Burns */}
      <motion.div
        key={`curr-${currentSlide.id}-${transitionId}`}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: "easeOut" }}
      >
        <motion.img
          src={currentSlide.image}
          alt={currentSlide.tag}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          initial={reduceMotion ? {} : v.from}
          animate={reduceMotion ? {} : v.to}
          transition={{ duration: 7.5, ease: "linear" }}
          draggable={false}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>
    </div>
  );
};

export default HeroCurtainStage;
