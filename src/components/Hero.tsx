import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 py-24">
      {/* Animated gradient orbs */}
      <motion.div
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="pointer-events-none absolute right-1/4 -bottom-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8 inline-block"
        >
          <motion.img
            src="/logo.png"
            alt="object0"
            className="mx-auto h-28 w-28"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6 font-extrabold text-5xl tracking-tight md:text-7xl"
        >
          object
          <motion.span
            className="inline-block text-primary"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          >
            0
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mb-4 max-w-2xl text-base-content/70 text-xl md:text-2xl"
        >
          A free and open-source desktop S3 bucket manager.
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mx-auto mb-10 max-w-xl text-base text-base-content/50"
        >
          Manage AWS S3, Cloudflare R2, DigitalOcean Spaces, MinIO, Backblaze
          B2, Google Cloud Storage, and any S3-compatible provider — from one
          fast, cross-platform desktop app.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#downloads"
            className="btn btn-primary btn-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <i className="fa-solid fa-download" />
            Download Now
          </motion.a>
          <motion.a
            href="https://github.com/sayedhfatimi/object0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <i className="fa-brands fa-github" />
            View Source
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-base-content/40 text-sm"
        >
          {[
            { icon: "fa-solid fa-scale-balanced", text: "MIT License" },
            {
              icon: "fa-brands fa-apple",
              extra: ["fa-brands fa-linux", "fa-brands fa-windows"],
              text: "Cross-platform",
            },
            { icon: "fa-solid fa-lock", text: "End-to-end encrypted vault" },
          ].map((badge) => (
            <motion.span
              key={badge.text}
              className="flex items-center gap-1.5"
              whileHover={{ scale: 1.08, color: "var(--color-primary)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className={badge.icon} />
              {badge.extra?.map((ex) => (
                <i key={ex} className={ex} />
              ))}
              {badge.text}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <motion.a
            href="#providers"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="inline-block text-base-content/30 transition-colors hover:text-primary"
          >
            <i className="fa-solid fa-chevron-down text-xl" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
