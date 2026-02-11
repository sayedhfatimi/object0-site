import { motion } from "framer-motion";
import { usePlatformDownloads } from "@/hooks/usePlatformDownloads";

const platforms = [
  {
    key: "macOS" as const,
    name: "macOS",
    subtitle: "Apple Silicon + Intel",
    icon: "fa-brands fa-apple",
  },
  {
    key: "Linux" as const,
    name: "Linux",
    subtitle: "x86_64",
    icon: "fa-brands fa-linux",
  },
  {
    key: "Windows" as const,
    name: "Windows",
    subtitle: "x86_64",
    icon: "fa-brands fa-windows",
  },
];

export default function Downloads() {
  const downloadLinks = usePlatformDownloads();

  return (
    <section id="downloads" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">
            Download object0
          </h2>
          <p className="mx-auto max-w-xl text-base-content/60">
            Free and open-source installers and standalone binaries for macOS,
            Linux, and Windows.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {platforms.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: i * 0.1,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0 16px 40px -10px oklch(0.5 0.1 260 / 0.15)",
              }}
              className="flex flex-col items-center rounded-box border border-base-300 bg-base-200 p-8"
            >
              <motion.i
                className={`${p.icon} mb-4 text-4xl text-primary`}
                whileHover={{ scale: 1.25, y: -4 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              <h3 className="mb-1 font-bold text-xl">{p.name}</h3>
              <p className="mb-6 text-base-content/50 text-sm">{p.subtitle}</p>
              <div className="flex w-full flex-col gap-4">
                <div className="w-full">
                  <p className="mb-2 font-semibold text-[0.7rem] text-base-content/55 uppercase tracking-wider">
                    Installers
                  </p>
                  <div className="flex w-full flex-col gap-2">
                    {downloadLinks[p.key].installers.map((l) => (
                      <motion.a
                        key={`installer-${l.label}-${l.href}`}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm w-full"
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <i className="fa-solid fa-download" />
                        {l.label}
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="w-full">
                  <p className="mb-2 font-semibold text-[0.7rem] text-base-content/55 uppercase tracking-wider">
                    Standalone
                  </p>
                  <div className="flex w-full flex-col gap-2">
                    {downloadLinks[p.key].standalone.map((l) => (
                      <motion.a
                        key={`standalone-${l.label}-${l.href}`}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm w-full"
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <i className="fa-solid fa-download" />
                        {l.label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 rounded-box border border-base-300 bg-base-200 p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-base-content/70 text-xs uppercase tracking-wider">
                Arch Linux
              </p>
              <h3 className="mt-1 font-bold text-xl">Install from AUR</h3>
            </div>
            <a
              href="https://aur.archlinux.org/packages/object0-bin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              <i className="fa-solid fa-arrow-up-right-from-square" />
              object0-bin
            </a>
          </div>

          <p className="mt-3 text-base-content/60 text-sm">
            Use your preferred AUR helper:
          </p>

          <div className="mt-3 grid gap-2 md:grid-cols-2">
            <div className="rounded-lg border border-base-300 bg-base-100 px-3 py-2 font-mono text-sm">
              yay -S object0-bin
            </div>
            <div className="rounded-lg border border-base-300 bg-base-100 px-3 py-2 font-mono text-sm">
              paru -S object0-bin
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-base-content/40 text-sm"
        >
          Or build from source:{" "}
          <motion.a
            href="https://github.com/sayedhfatimi/object0"
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover link"
            whileHover={{ scale: 1.05 }}
          >
            github.com/sayedhfatimi/object0
          </motion.a>
        </motion.p>
      </div>
    </section>
  );
}
