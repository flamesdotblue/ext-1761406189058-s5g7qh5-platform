import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function HeroCover() {
  return (
    <section className="relative h-[70vh] w-full">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/vc19ejtcC5VJjy5v/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-neutral-950/40 to-neutral-950"></div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl px-4">
        <div className="my-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-balance text-4xl font-semibold tracking-tight text-neutral-50 md:text-6xl"
          >
            Real-time Hackathon Scraper
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-neutral-300"
          >
            Stream new hackathons as they’re posted across the web. Filter by source and keywords. Built for speed, visibility, and developers who love live data.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <a
              href="#feed"
              className="rounded-lg bg-yellow-400 px-4 py-2 font-medium text-black shadow hover:bg-yellow-300"
            >
              View Live Feed
            </a>
            <span className="text-sm text-neutral-400">Dark, modern, animated cover powered by Spline</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
