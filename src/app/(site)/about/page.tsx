"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  BookOpen,
  Users,
  MapPin,
  Award,
  Quote,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    title: "Compassion",
    description:
      "We approach every family with empathy, understanding, and warmth.",
    icon: Heart,
  },
  {
    title: "Family-centered practice",
    description:
      "Parents and caregivers are the true experts on their children; we are here to support and guide.",
    icon: Users,
  },
  {
    title: "Evidence-based care",
    description:
      "Our methods are grounded in the latest research in early childhood development.",
    icon: BookOpen,
  },
  {
    title: "Community partnership",
    description:
      "We build strong relationships within Southwest Alabama to surround families with support.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="border-b bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-6 font-serif text-4xl font-bold text-foreground md:text-5xl">
              About Us
            </h1>

            <p className="text-xl leading-relaxed text-muted-foreground">
              Helping Hands Home &amp; Community Based Services, LLC is
              dedicated to helping infants and toddlers grow, learn, and thrive
              through Early Intervention services. We support families through
              compassionate coaching, developmental services, and
              community-based support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* LEFT CONTENT */}
            <div className="space-y-16 lg:col-span-8">
              {/* MISSION & VISION */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  {/* Mission */}
                  <div className="rounded-2xl border border-primary/10 bg-primary/5 p-8">
                    <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold text-foreground">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <ShieldCheck size={18} />
                      </span>
                      Our Mission
                    </h2>

                    <p className="text-lg leading-relaxed text-muted-foreground">
                      To empower families with the knowledge, skills, and
                      support to help their infants and toddlers reach their
                      full developmental potential through compassionate,
                      family-centered early intervention services.
                    </p>
                  </div>

                  {/* Vision */}
                  <div className="rounded-2xl border border-secondary/20 bg-secondary/10 p-8">
                    <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold text-foreground">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/30 text-secondary-foreground">
                        <BookOpen size={18} />
                      </span>
                      Our Vision
                    </h2>

                    <p className="text-lg leading-relaxed text-muted-foreground">
                      A Southwest Alabama where every child has the opportunity
                      to thrive, supported by strong families and a community
                      that invests in the earliest years of life.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* FOUNDER */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="mb-8 font-serif text-3xl font-bold text-foreground">
                  Meet the Founder
                </h2>

                <div className="flex flex-col items-start gap-8 md:flex-row">
                  {/* Founder Photo */}
                  <div className="w-full shrink-0 md:w-1/3">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md">
                      <Image
                        src="/images/founder.jpeg"
                        alt="Dr. Shawaungela Bolden DeLoach, Ed.D. — Founder and Owner of Helping Hands HCBS"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-lg font-bold leading-tight text-foreground">
                        Dr. Shawaungela Bolden DeLoach, Ed.D.
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Founder &amp; Owner
                      </p>
                    </div>
                  </div>

                  {/* Founder Biography */}
                  <div className="w-full space-y-5 md:w-2/3">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      Dr. Shawaungela Bolden DeLoach, Ed.D. is the Founder and
                      Owner of Helping Hands Home &amp; Community-Based
                      Services, LLC. A visionary leader with more than 25 years
                      of experience in education, special education, and
                      leadership, she has devoted her career to creating
                      opportunities that transform the lives of children and
                      families.
                    </p>

                    <p className="text-lg leading-relaxed text-muted-foreground">
                      Recognizing that the earliest years of life shape a
                      child&apos;s future, Dr. DeLoach founded Helping Hands
                      with a bold vision: to provide exceptional,
                      family-centered Early Intervention services that empower
                      children to reach developmental milestones, strengthen
                      families, and build brighter futures. Her leadership is
                      grounded in excellence, compassion, integrity, and an
                      unwavering belief that every child deserves the
                      opportunity to thrive.
                    </p>

                    <p className="text-lg leading-relaxed text-muted-foreground">
                      Through innovation, collaboration, and a commitment to
                      evidence-based practices, Dr. DeLoach is leading Helping
                      Hands as a trusted provider of Early Intervention
                      services across Alabama. Her mission extends beyond
                      meeting developmental needs — it is to inspire hope,
                      equip families with the tools they need to succeed, and
                      create lasting impact in the communities they serve.
                    </p>

                    <blockquote className="relative mt-6 rounded-2xl border-l-4 border-primary bg-primary/5 p-6">
                      <Quote
                        className="absolute right-4 top-4 h-8 w-8 text-primary/20"
                        aria-hidden="true"
                      />

                      <p className="pr-6 text-lg font-medium italic leading-relaxed text-foreground">
                        &ldquo;Every child has limitless potential. By
                        empowering families, embracing possibilities, and
                        intervening early, we don&apos;t just change outcomes —
                        we change futures.&rdquo;
                      </p>

                      <footer className="mt-3 text-sm font-semibold text-muted-foreground">
                        — Dr. Shawaungela Bolden DeLoach, Ed.D.
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </motion.section>

              {/* CORE VALUES */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="mb-8 font-serif text-3xl font-bold text-foreground">
                  Our Core Values
                </h2>

                <div className="grid gap-6 sm:grid-cols-2">
                  {values.map((value) => {
                    const Icon = value.icon;

                    return (
                      <Card
                        key={value.title}
                        className="border-none bg-muted/30 shadow-sm"
                      >
                        <CardContent className="p-6">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary shadow-sm">
                            <Icon className="h-6 w-6" />
                          </div>

                          <h3 className="mb-2 text-xl font-bold text-foreground">
                            {value.title}
                          </h3>

                          <p className="leading-relaxed text-muted-foreground">
                            {value.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </motion.section>
            </div>

            {/* SIDEBAR */}
            <aside className="space-y-8 lg:col-span-4">
              {/* Community Commitment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="relative overflow-hidden border-none bg-primary text-white shadow-md">
                  <div className="pointer-events-none absolute right-0 top-0 p-8 opacity-10">
                    <MapPin size={120} />
                  </div>

                  <CardContent className="relative z-10 p-8">
                    <h3 className="mb-4 font-serif text-2xl font-bold">
                      Community Commitment
                    </h3>

                    <p className="mb-6 text-lg leading-relaxed text-primary-foreground/90">
                      Serving Southwest Alabama — Mobile County, Washington
                      County, Escambia County, Clarke County, and surrounding
                      communities.
                    </p>

                    <div className="border-t border-white/20 pt-6">
                      <p className="mb-2 text-sm font-medium uppercase tracking-wider text-white/80">
                        Our Promise
                      </p>

                      <p className="italic text-white">
                        We bring services to where children live, learn, and
                        play.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Qualifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
              >
                <Card className="border bg-card shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-foreground">
                      <Award className="text-accent" />
                      Qualifications
                    </h3>

                    <p className="mb-4 text-muted-foreground">
                      Credentials and certifications coming soon. Contact us to
                      learn more about our qualified team of professionals.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}