import { AnimatePresence, motion } from "framer-motion";
import { useLatestRelease } from "@/hooks/useLatestRelease";

interface NavbarProps {
  theme: "dark-dim" | "light-nord";
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const { version, url } = useLatestRelease();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="navbar sticky top-0 z-50 border-base-300 border-b bg-base-100/80 px-6 backdrop-blur-md"
    >
      <div className="navbar-start">
        <motion.a
          href="/"
          className="flex items-center gap-2 font-bold text-xl"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.img
            src="/logo.png"
            alt="object0"
            className="h-8 w-8"
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          object0
        </motion.a>

        <AnimatePresence>
          {version && (
            <motion.a
              href={url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="badge badge-primary badge-sm ml-2"
            >
              {version}
            </motion.a>
          )}
        </AnimatePresence>
      </div>

      <div className="navbar-center hidden gap-6 md:flex">
        {["Providers", "Features", "Security", "Downloads"].map((label) => (
          <motion.a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="link-hover link text-sm"
            whileHover={{ y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {label}
          </motion.a>
        ))}
      </div>

      <div className="navbar-end flex items-center gap-3">
        <motion.button
          type="button"
          onClick={onToggleTheme}
          className="btn btn-ghost btn-circle btn-sm"
          aria-label="Toggle theme"
          whileTap={{ scale: 0.85, rotate: 180 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <AnimatePresence mode="wait">
            <motion.i
              key={theme}
              className={`fa-solid ${theme === "dark-dim" ? "fa-sun" : "fa-moon"} text-lg`}
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </motion.button>

        <motion.a
          href="https://github.com/sayedhfatimi/object0"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-circle btn-sm"
          aria-label="GitHub"
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fa-brands fa-github text-lg" />
        </motion.a>
      </div>
    </motion.nav>
  );
}
