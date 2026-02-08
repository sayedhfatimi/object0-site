import { motion } from "framer-motion";

const providers = [
  { name: "AWS S3", icon: "fa-brands fa-aws" },
  { name: "Cloudflare R2", icon: "fa-brands fa-cloudflare" },
  { name: "DigitalOcean Spaces", icon: "fa-brands fa-digital-ocean" },
  { name: "Google Cloud Storage", icon: "fa-brands fa-google" },
  { name: "Backblaze B2", icon: "fa-solid fa-cloud" },
  { name: "MinIO", icon: "fa-solid fa-server" },
  { name: "S3-Compatible", icon: "fa-solid fa-plug" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function Providers() {
  return (
    <section id="providers" className="bg-base-200 px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 font-bold text-3xl md:text-4xl"
        >
          One app. Every provider.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-12 max-w-xl text-base-content/60"
        >
          Connect to any S3-compatible storage provider. Switch between accounts
          and providers instantly.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
        >
          {providers.map((p) => (
            <motion.div
              key={p.name}
              variants={item}
              whileHover={{
                y: -6,
                scale: 1.04,
                boxShadow: "0 12px 30px -8px oklch(0.5 0.1 260 / 0.15)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex cursor-default flex-col items-center gap-3 rounded-box border border-base-300 bg-base-100 p-6"
            >
              <motion.i
                className={`${p.icon} text-3xl text-primary`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span className="font-medium text-sm">{p.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
