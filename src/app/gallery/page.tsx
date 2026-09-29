"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  fadeIn,
  stagger,
  staggerItemScale as item,
} from "@/lib/animations";

const images = [
  {
    src: "/images/gallery-1.png",
    caption:
      "Fine motor stacking activity during an Early Intervention session.",
  },
  {
    src: "/images/gallery-2.png",
    caption:
      "One-on-one puzzle activity supporting cognitive and motor skills.",
  },
  {
    src: "/images/gallery-3.png",
    caption:
      "Block building session developing spatial reasoning and fine motor coordination.",
  },
  {
    src: "/images/gallery-4.png",
    caption:
      "Peg board activity to build fine motor precision and focus.",
  },
  {
    src: "/images/gallery-5.png",
    caption:
      "Building skills through parent-child play.",
  },
  {
    src: "/images/gallery-6.png",
    caption:
      "Connecting families in community settings.",
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* Page Header */}
      <section className="border-b bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            {...fadeIn}
          >
            <h1 className="mb-6 font-serif text-4xl font-bold text-foreground md:text-5xl">
              Photo Gallery
            </h1>

            <p className="text-xl leading-relaxed text-muted-foreground">
              A glimpse into our natural environment therapy
              sessions and family coaching approach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {images.map((image, index) => (
              <motion.div
                key={image.src}
                variants={item}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src={image.src}
                      alt={image.caption}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={index < 3}
                    />
                  </AspectRatio>

                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="font-medium leading-snug text-white shadow-sm">
                      {image.caption}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-center text-sm font-medium text-muted-foreground md:hidden">
                  {image.caption}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}