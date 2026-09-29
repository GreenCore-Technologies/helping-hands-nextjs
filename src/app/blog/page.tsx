"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  fadeIn,
  stagger,
  staggerItem as item,
} from "@/lib/animations";

const posts = [
  {
    title:
      "Understanding Developmental Milestones: Birth to 12 Months",
    date: "June 2025",
    excerpt:
      "Every child develops at their own pace, but understanding typical milestones can help caregivers identify when support might be needed.",
  },
  {
    title:
      "The Power of Caregiver Coaching in Early Intervention",
    date: "May 2025",
    excerpt:
      "Research shows that when caregivers are empowered with the right strategies, children make faster and more lasting developmental progress.",
  },
  {
    title:
      "Natural Environment Therapy: Why We Come to You",
    date: "April 2025",
    excerpt:
      "Early Intervention is most effective when services take place in the child's natural environment — at home, in daycare, or in the community.",
  },
  {
    title:
      "Signs Your Toddler May Benefit from Speech Therapy",
    date: "March 2025",
    excerpt:
      "Communication delays are among the most common reasons families seek Early Intervention. Here's what to watch for between ages 1 and 3.",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Page Header */}
      <section className="border-b bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl"
            {...fadeIn}
          >
            <h1 className="mb-6 font-serif text-4xl font-bold text-foreground md:text-5xl">
              Parent Education &amp; Blog
            </h1>

            <p className="text-xl leading-relaxed text-muted-foreground">
              Resources, tips, and insights to help you support
              your child&apos;s early development journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {posts.map((post) => (
              <motion.div
                key={post.title}
                variants={item}
                className="flex h-full"
              >
                <Card className="group flex h-full w-full flex-col border-border/60 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-8">
                    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      {post.date}
                    </div>

                    <h2 className="mb-4 line-clamp-2 font-serif text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>

                    <p className="mb-8 flex-grow leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    {/*
                      Individual article routes will be added in a
                      later content phase.
                    */}
                    <div className="mt-auto border-t border-border/50 pt-4">
                      <Button
                        type="button"
                        variant="ghost"
                        disabled
                        className="group/btn w-full justify-between px-0 text-primary disabled:cursor-default disabled:opacity-70"
                        aria-label={`${post.title} article coming soon`}
                      >
                        Coming Soon

                        <ChevronRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter */}
          <div className="mx-auto mt-20 max-w-2xl text-center">
            <div className="rounded-2xl border border-secondary/20 bg-secondary/10 p-8">
              <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                Subscribe to our Newsletter
              </h3>

              <p className="mb-6 text-muted-foreground">
                Get early childhood development tips delivered
                straight to your inbox.
              </p>

              {/*
                Newsletter provider/API will be connected in a
                later phase. Keep this clearly non-functional
                until that backend exists.
              */}
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  disabled
                  aria-label="Newsletter email address"
                  className="flex h-12 w-full max-w-sm rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60"
                />

                <Button
                  type="button"
                  disabled
                  className="h-12 rounded-full bg-secondary px-8 font-semibold text-foreground disabled:opacity-60"
                >
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}