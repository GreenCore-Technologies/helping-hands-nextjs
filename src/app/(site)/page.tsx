
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  Home,
  Users,
  CheckCircle,
  Map,
  Award,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  fadeIn,
  stagger,
  staggerItem as item,
} from "@/lib/animations";

const highlights = [
  {
    title: "Early Intervention at No Cost to Families",
    icon: Award,
  },
  { title: "Family-Centered Care", icon: Heart },
  { title: "Caregiver Coaching", icon: Users },
  { title: "Evidence-Based Support", icon: CheckCircle },
  { title: "Services in Natural Environments", icon: Home },
  { title: "Serving Southwest Alabama", icon: Map },
];

const featuredServices = [
  {
    title: "Developmental Monitoring",
    desc: "Routine tracking of a child's developmental milestones to identify potential delays early.",
  },
  {
    title: "Speech-Language Therapy",
    desc: "Support for communication, language, and feeding challenges in infants and toddlers.",
  },
  {
    title: "Occupational Therapy",
    desc: "Helps children develop fine motor skills, sensory processing, and daily living skills.",
  },
  {
    title: "Caregiver Coaching",
    desc: "Equipping parents and caregivers with evidence-based strategies to support development.",
  },
];

const steps = [
  {
    num: "01",
    title: "Contact or Referral",
    desc: "Reach out to us or have a provider submit a referral form to get started.",
  },
  {
    num: "02",
    title: "Developmental Support Planning",
    desc: "We work with you to understand your child's needs and create a customized plan.",
  },
  {
    num: "03",
    title: "Services in Natural Settings",
    desc: "Therapy and support delivered at home, daycare, or community settings.",
  },
  {
    num: "04",
    title: "Ongoing Coaching & Support",
    desc: "Continuous guidance for caregivers to reinforce progress in daily routines.",
  },
];

const sessionPhotos = [
  {
    src: "/images/session-1.png",
    alt: "Therapist guiding a toddler through a fine motor activity.",
  },
  {
    src: "/images/session-2.png",
    alt: "Therapist supporting a child during a developmental activity.",
  },
  {
    src: "/images/session-3.png",
    alt: "Child participating in an early intervention learning activity.",
  },
  {
    src: "/images/session-4.png",
    alt: "Therapist and child working together on fine motor coordination.",
  },
];

export default function HomePage() {
  return (
    <>
        {/* Hero */}
        <section className="relative overflow-hidden bg-muted py-20 lg:py-32">
          <div className="absolute inset-0">
            <Image
              src="/images/hero.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-white/80" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20" />

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="mb-6 inline-block rounded-full bg-accent/20 px-3 py-1 text-sm font-semibold text-accent-foreground">
                  Serving Southwest Alabama
                </span>
              </motion.div>

              <motion.h1
                className="mb-6 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Helping Families Support Early Childhood Development
              </motion.h1>

              <motion.p
                className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Compassionate, evidence-based Early Intervention services
                for infants and toddlers from birth to age three
                throughout Southwest Alabama.
              </motion.p>

              <motion.div
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="h-14 w-full rounded-full bg-primary px-8 text-lg text-white hover:bg-primary/90 sm:w-auto"
                >
                  <Link href="/referral">Make a Referral</Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 w-full rounded-full border-primary/20 bg-white/50 px-8 text-lg text-foreground hover:border-primary/50 hover:bg-white sm:w-auto"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="mx-auto mb-16 max-w-2xl text-center"
              {...fadeIn}
            >
              <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                Why Choose Helping Hands?
              </h2>
              <p className="text-lg text-muted-foreground">
                We partner with families to create supportive environments
                where infants and toddlers can thrive.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {highlights.map((highlight) => {
                const Icon = highlight.icon;

                return (
                  <motion.div key={highlight.title} variants={item}>
                    <Card className="h-full border-none bg-muted/30 shadow-sm transition-shadow hover:shadow-md">
                      <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
                        <Icon className="mb-4 h-8 w-8 text-primary" />
                        <h3 className="text-lg font-semibold">
                          {highlight.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="bg-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
              <motion.div className="max-w-2xl" {...fadeIn}>
                <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                  Our Services
                </h2>
                <p className="text-lg text-muted-foreground">
                  Comprehensive, evidence-based support tailored to your
                  child&apos;s unique developmental needs.
                </p>
              </motion.div>

              <Button asChild variant="ghost" className="text-primary">
                <Link href="/services">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {featuredServices.map((service) => (
                <motion.div key={service.title} variants={item}>
                  <Card className="group h-full transition-colors hover:border-primary/50">
                    <CardContent className="p-6 md:p-8">
                      <h3 className="mb-3 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground">{service.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Process */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="mx-auto mb-16 max-w-2xl text-center"
              {...fadeIn}
            >
              <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                Our Process
              </h2>
              <p className="text-lg text-muted-foreground">
                A simple, supportive journey from your first question
                to everyday developmental success.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-muted-foreground/20 lg:block" />

              <motion.div
                className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-4"
                variants={stagger}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                {steps.map((step) => (
                  <motion.div
                    key={step.num}
                    variants={item}
                    className="relative rounded-xl border border-border/50 bg-background p-6 text-center shadow-sm lg:border-none lg:pt-12 lg:text-left lg:shadow-none"
                  >
                    <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground shadow-sm lg:absolute lg:top-0 lg:mx-0 lg:-translate-y-1/2">
                      {step.num}
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Session Gallery */}
        <section className="bg-muted/40 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="mb-10 text-center"
              {...fadeIn}
            >
              <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">
                See Us in Action
              </h2>
              <p className="text-lg text-muted-foreground">
                Moments from our Early Intervention sessions across
                Southwest Alabama.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {sessionPhotos.map((photo) => (
                <motion.div
                  key={photo.src}
                  variants={item}
                  className="group relative overflow-hidden rounded-2xl shadow-sm"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-primary py-20 text-white">
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              className="mx-auto max-w-3xl"
              {...fadeIn}
            >
              <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">
                Support starts with one conversation.
              </h2>

              <p className="mb-10 text-xl text-primary-foreground/90">
                Contact Helping Hands today or make a referral to begin
                your journey.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-14 w-full rounded-full bg-white px-8 text-lg font-semibold text-primary hover:bg-white/90 sm:w-auto"
                >
                  <Link href="/referral">Make a Referral</Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 w-full rounded-full border-white/50 bg-transparent px-8 text-lg font-semibold text-white hover:bg-white/10 sm:w-auto"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
    </>
  );
}
