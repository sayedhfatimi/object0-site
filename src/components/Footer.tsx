import { motion } from "framer-motion";

const links = [
  {
    href: "https://github.com/sayedhfatimi/object0",
    icon: "fa-brands fa-github",
    label: "GitHub",
  },
  {
    href: "https://github.com/sayedhfatimi/object0/releases",
    icon: "fa-solid fa-tag",
    label: "Releases",
  },
  {
    href: "https://github.com/sayedhfatimi/object0/issues",
    icon: "fa-solid fa-bug",
    label: "Issues",
  },
  {
    href: "https://github.com/sayedhfatimi/object0/blob/main/LICENSE",
    icon: "fa-solid fa-scale-balanced",
    label: "MIT License",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-base-300 border-t bg-base-200 px-6 py-12"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 md:flex-row">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
        >
          <motion.img
            src="/logo.png"
            alt="object0"
            className="h-6 w-6"
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="font-semibold">object0</span>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex items-center gap-6 text-base-content/50 text-sm"
        >
          {links.map((l) => (
            <motion.a
              key={l.label}
              variants={item}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover link flex items-center gap-1.5"
              whileHover={{ y: -2, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <i className={l.icon} />
              {l.label}
            </motion.a>
          ))}
        </motion.div>

        <p className="text-base-content/40 text-sm">
          &copy; {year} Sayed Hamid Fatimi
        </p>
      </div>
    </motion.footer>
  );
}
