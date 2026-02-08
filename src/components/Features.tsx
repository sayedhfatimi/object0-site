import { motion } from "framer-motion";

const features = [
  {
    icon: "fa-solid fa-folder-tree",
    title: "Object Browser",
    description:
      "Browse, search, and manage objects with table and grid views. Multi-select, breadcrumb navigation, and 40+ file type icons.",
  },
  {
    icon: "fa-solid fa-arrows-rotate",
    title: "Folder Sync",
    description:
      "Google Drive-style bidirectional folder sync with three-way diff, conflict resolution, and auto-sync on unlock.",
  },
  {
    icon: "fa-solid fa-cloud-arrow-up",
    title: "Fast Transfers",
    description:
      "Streaming multipart uploads for large files. Upload, download, copy, move, and rename — with concurrent job queue.",
  },
  {
    icon: "fa-solid fa-list-check",
    title: "Job Queue",
    description:
      "Configurable concurrency (1–10), real-time progress bars, transfer speed, ETA, and persistent history.",
  },
  {
    icon: "fa-solid fa-share-nodes",
    title: "Presigned Sharing",
    description:
      "Generate presigned URLs with customizable expiration. Copy to clipboard, generate QR codes, and track share history.",
  },
  {
    icon: "fa-solid fa-layer-group",
    title: "Tabbed Browsing",
    description:
      "Open multiple buckets across different profiles in tabs. Session persistence keeps your tabs across restarts.",
  },
  {
    icon: "fa-solid fa-arrow-down-a-z",
    title: "Bucket Sync",
    description:
      "Additive, overwrite, or mirror sync modes with a diff preview before execution. Cross-bucket and cross-profile.",
  },
  {
    icon: "fa-solid fa-bell",
    title: "Auto Updates",
    description:
      "Checks for updates automatically. Downloads in the background and notifies you when a new version is ready.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  },
};

export default function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">
            Everything you need to manage your storage.
          </h2>
          <p className="mx-auto max-w-xl text-base-content/60">
            A powerful set of tools designed for developers, teams, and anyone
            who works with S3-compatible object storage.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 16px 40px -10px oklch(0.5 0.1 260 / 0.12)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="cursor-default rounded-box border border-base-300 bg-base-200 p-6"
            >
              <motion.div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-btn bg-primary/10"
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <i className={`${f.icon} text-primary text-xl`} />
              </motion.div>
              <h3 className="mb-2 font-semibold text-lg">{f.title}</h3>
              <p className="text-base-content/60 text-sm leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
