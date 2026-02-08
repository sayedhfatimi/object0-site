import { motion } from "framer-motion";

const points = [
  {
    icon: "fa-solid fa-shield-halved",
    title: "AES-256-GCM Encryption",
    description:
      "Your API keys and credentials are encrypted with AES-256-GCM and PBKDF2 key derivation. They never leave the main process.",
  },
  {
    icon: "fa-solid fa-key",
    title: "OS Keychain Integration",
    description:
      "Optionally cache your vault passphrase in the OS keychain for seamless auto-unlock on startup.",
  },
  {
    icon: "fa-solid fa-rotate-left",
    title: "Recovery Key System",
    description:
      "Generate a recovery key to regain access if you forget your passphrase. Change your passphrase at any time.",
  },
  {
    icon: "fa-solid fa-eye-slash",
    title: "Zero-Knowledge Webview",
    description:
      "API keys are kept exclusively in the Bun backend process. The webview UI never has access to raw credentials.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant = (i: number) => ({
  hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 10 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring" as const, stiffness: 180, damping: 20 },
  },
});

export default function Security() {
  return (
    <section id="security" className="bg-base-200 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.div
            className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
            whileHover={{ scale: 1.15, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <i className="fa-solid fa-vault text-2xl text-primary" />
          </motion.div>
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">
            Built with security in mind.
          </h2>
          <p className="mx-auto max-w-xl text-base-content/60">
            Your credentials are encrypted at rest and isolated from the UI
            layer. No cloud accounts, no telemetry, no tracking.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              variants={cardVariant(i)}
              whileHover={{ x: i % 2 === 0 ? 6 : -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex cursor-default gap-4"
            >
              <motion.div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-btn bg-primary/10"
                whileHover={{ scale: 1.2, rotate: -8 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <i className={`${p.icon} text-lg text-primary`} />
              </motion.div>
              <div>
                <h3 className="mb-1 font-semibold text-lg">{p.title}</h3>
                <p className="text-base-content/60 text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
