"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Baby,
  Calendar,
  CheckCircle,
  ClipboardList,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const criteria = [
  {
    icon: <Baby className="h-6 w-6" />,
    title: "Age Requirement",
    desc: "Children from birth through 35 months (up to but not including their third birthday) are served under Early Intervention.",
  },
  {
    icon: <AlertCircle className="h-6 w-6" />,
    title: "Developmental Delay",
    desc: "A child shows a measurable delay in one or more developmental areas: physical, cognitive, communication, social-emotional, or adaptive.",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Established Condition",
    desc: "A child has a diagnosed physical or mental condition that is known to result in developmental delay (e.g., Down syndrome, cerebral palsy, hearing loss).",
  },
  {
    icon: <AlertCircle className="h-6 w-6" />,
    title: "At-Risk Status",
    desc: "In some cases, infants at significant biological or environmental risk of delay may also qualify — a specialist can help determine this.",
  },
];

const steps = [
  {
    num: "01",
    title: "Submit a Referral",
    desc: "You, a doctor, a childcare provider, or any concerned adult can submit a referral. No formal diagnosis is required to request an evaluation.",
  },
  {
    num: "02",
    title: "Initial Contact",
    desc: "A Helping Hands team member will reach out within 2 business days to discuss next steps and gather some basic information about your child.",
  },
  {
    num: "03",
    title: "Multidisciplinary Evaluation",
    desc: "A team of qualified professionals evaluates your child across all developmental areas at no cost to your family. This typically happens in your home or a familiar setting.",
  },
  {
    num: "04",
    title: "Eligibility Determination",
    desc: "Based on the evaluation results, the team determines whether your child qualifies for Early Intervention services.",
  },
  {
    num: "05",
    title: "Individualized Family Service Plan (IFSP)",
    desc: "If eligible, you and the team create an IFSP together — a personalized plan outlining your child's goals and the services that will support them.",
  },
  {
    num: "06",
    title: "Services Begin",
    desc: "Services start in your child's natural environment (home, daycare, or community) with you as an active partner in every session.",
  },
];

const developmentalAreas = [
  "Physical / Motor Development",
  "Cognitive Development",
  "Communication & Language",
  "Social-Emotional Development",
  "Adaptive / Self-Help Skills",
];

export default function EligibilityPage() {
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
              Eligibility
            </h1>

            <p className="text-xl leading-relaxed text-muted-foreground">
              Early Intervention services are designed for infants and toddlers
              who may have a developmental delay or disability. Understanding
              eligibility is the first step toward getting your child the
              support they deserve.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="bg-background py-20">
        <div className="container mx-auto space-y-24 px-4">

          {/* WHO QUALIFIES */}
          <section>
            <motion.div
              className="mx-auto mb-16 max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                Who Qualifies?
              </h2>

              <p className="text-lg text-muted-foreground">
                A child may be eligible for Early Intervention services if they
                meet one of the following criteria, as determined by a
                qualified evaluation team.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {criteria.map((criterion, index) => (
                <motion.div
                  key={criterion.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.08, 0.24),
                  }}
                >
                  <Card className="h-full border border-border shadow-sm transition-colors hover:border-primary/30">
                    <CardContent className="p-8">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {criterion.icon}
                      </div>

                      <h3 className="mb-3 font-serif text-xl font-bold text-foreground">
                        {criterion.title}
                      </h3>

                      <p className="leading-relaxed text-muted-foreground">
                        {criterion.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* DEVELOPMENTAL AREAS */}
          <section className="rounded-3xl bg-primary/5 p-10 lg:p-16">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                Developmental Areas Evaluated
              </h2>

              <p className="mb-10 text-lg text-muted-foreground">
                Evaluations look at all five developmental domains. A
                measurable delay in any one area may establish eligibility.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {developmentalAreas.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-3 rounded-xl border border-border/50 bg-white p-4 shadow-sm"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-accent" />
                    <span className="font-medium text-foreground">{area}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* COST */}
          <section>
            <motion.div
              className="max-w-3xl rounded-2xl border border-secondary/30 bg-secondary/20 p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 flex items-center gap-3 font-serif text-2xl font-bold text-foreground">
                <Calendar className="h-7 w-7 shrink-0 text-primary" />
                Is There a Cost to Families?
              </h2>

              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                The evaluation to determine eligibility is{" "}
                <strong className="text-foreground">always free</strong> to
                families. Many Early Intervention services are also provided at
                no cost, depending on your family&apos;s situation and
                available funding.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                A service coordinator will walk you through any financial
                details specific to your child&apos;s plan before services
                begin. No family is turned away due to an inability to pay.
              </p>
            </motion.div>
          </section>

          {/* EVALUATION PROCESS */}
          <section>
            <motion.div
              className="mx-auto mb-16 max-w-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                The Evaluation Process
              </h2>

              <p className="text-lg text-muted-foreground">
                From your first contact to the start of services, here&apos;s
                what you can expect — typically within 45 days of referral.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index * 0.06, 0.2),
                  }}
                >
                  <Card className="h-full overflow-hidden border border-border shadow-sm">
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary/50 to-secondary/50" />

                    <CardContent className="p-7">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                        {step.num}
                      </div>

                      <h3 className="mb-3 font-serif text-lg font-bold text-foreground">
                        {step.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* WHAT TO BRING */}
          <section>
            <motion.div
              className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <ClipboardList className="mt-1 h-8 w-8 shrink-0 text-primary" />

                <div>
                  <h2 className="mb-3 font-serif text-2xl font-bold text-foreground">
                    What to Bring to the Evaluation
                  </h2>

                  <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    PLACEHOLDER — replace in later phase with confirmed
                    evaluation checklist
                  </p>

                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                      Child&apos;s birth certificate or proof of age
                    </li>

                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                      Insurance information (if applicable)
                    </li>

                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                      Any prior medical records or evaluations
                    </li>

                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                      Notes on your child&apos;s development and concerns
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </section>

          {/* CTA */}
          <section>
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-primary p-10 text-center text-white lg:p-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="mb-4 font-serif text-3xl font-bold">
                  Not sure if your child qualifies?
                </h2>

                <p className="mb-8 text-lg text-primary-foreground/90">
                  Reach out — we&apos;re happy to answer your questions before
                  you submit a referral. There is no obligation, and asking
                  costs nothing.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/referral">
                    <Button
                      size="lg"
                      className="h-14 w-full rounded-full bg-white px-8 text-lg font-semibold text-primary shadow-lg hover:bg-white/90 sm:w-auto"
                    >
                      Make a Referral
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 w-full rounded-full border-white/50 bg-transparent px-8 font-semibold text-white hover:bg-white/10 sm:w-auto"
                    >
                      Ask a Question
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
}