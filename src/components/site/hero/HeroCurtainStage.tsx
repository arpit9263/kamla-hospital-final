import { AnimatePresence, motion } from "framer-motion";
import type { Slide } from "./data";

type Props = {
  currentSlide: Slide;
  previousSlide: Slide | null;
  transitionId: number;
  reduceMotion: boolean;
};

const HeroCurtainStage = ({ currentSlide, previousSlide, transitionId, reduceMotion }: Props) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Previous slide fades out */}
      <AnimatePresence initial={false}>
        {previousSlide && (
          <motion.div
            key={`prev-${transitionId}`}
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.25 : 1.1, ease: "easeInOut" }}
            aria-hidden
          >
            <img
              src={previousSlide.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            {/* Strong overlay on previous slide during exit */}
            <div className="absolute inset-0 bg-foreground/30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current slide enters with zoom-in Ken Burns */}
      <motion.div
        key={`curr-${currentSlide.id}-${transitionId}`}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.25 : 1.2, ease: "easeOut" }}
      >
        <motion.img
          src={currentSlide.image}
          alt={currentSlide.tag}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          initial={reduceMotion ? {} : { scale: 1.08 }}
          animate={reduceMotion ? {} : { scale: 1.0 }}
          transition={{ duration: 7, ease: "linear" }}
          draggable={false}
          fetchPriority="high"
        />
      </motion.div>
    </div>
  );
};

export default HeroCurtainStage;
