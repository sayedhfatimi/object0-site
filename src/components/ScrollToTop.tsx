import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setVisible(v > 0.15));
  }, [scrollYProgress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn btn-primary btn-circle btn-sm fixed right-6 bottom-6 z-50 shadow-lg"
          aria-label="Scroll to top"
        >
          <i className="fa-solid fa-chevron-up" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
