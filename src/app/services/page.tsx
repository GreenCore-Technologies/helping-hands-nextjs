"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  CheckCircle,
  Ear,
  Hand,
  Heart,
  Link as LinkIcon,
  ShieldAlert,
  Smile,
  Users,
  Utensils,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Service {
  title: string;
  description: string;
  audience: string;
  benefits: string[];
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: "Developmental Monitoring & Surveillance",
    description:
      "We track your child's developmental milestones regularly so that any delays can be caught and addressed as early as possible. Early action during the birth-to-3 window makes the biggest difference — and our team makes the process simple and reassuring for your whole family.",
    audience:
      "Families with any concern about their child's growth or development, as well as pediatricians, hospitals, and childcare providers who want a closer look.",
    benefits: [
      "Early identification of delays before they compound",
      "A personalized monitoring plan built around your child",
      "Guidance on what milestones to watch for at each age",
    ],
    icon: <Activity className="h-7 w-7" />,
  },
  {
    title: "Speech-Language Therapy",
    description:
      "Our therapists help infants and toddlers who are having trouble talking, understanding language, or feeding. Sessions are led by a specialist but designed so that you — the caregiver — learn practical strategies to keep the progress going every day.",
    audience:
      "Children who aren't hitting communication or language milestones, or who are struggling with feeding, swallowing, or eating.",
    benefits: [
      "Improved ability to communicate needs and feelings",
      "Stronger caregiver skills to support language every day",
      "Safe, specialized support for feeding and swallowing challenges",
    ],
    icon: <Ear className="h-7 w-7" />,
  },
  {
    title: "Occupational Therapy",
    description:
      "Occupational therapy helps your child build the fine motor skills and sensory awareness needed to play, learn, and manage daily routines. We bring therapy into your home or daycare so your child can practice in the environment they already know.",
    audience:
      "Children who have difficulty with grasping, hand coordination, sensory sensitivities, or everyday tasks like feeding and dressing.",
    benefits: [
      "Improved fine motor skills for play and self-care",
      "Better ability to manage sensory experiences",
      "Practical strategies woven into your family's daily routines",
    ],
    icon: <Hand className="h-7 w-7" />,
  },
  {
    title: "Physical Therapy",
    description:
      "Physical therapy supports infants and toddlers who are developing more slowly in areas like rolling, sitting, crawling, standing, or walking. Our therapists guide families through movement activities that fit naturally into your child's day.",
    audience:
      "Infants and toddlers who are behind in large-muscle movement skills, or who have low muscle tone, balance challenges, or difficulty moving.",
    benefits: [
      "Improved strength, balance, and body coordination",
      "Age-appropriate movement milestones supported",
      "Caregiver-led movement activities for home practice",
    ],
    icon: <Zap className="h-7 w-7" />,
  },
  {
    title: "Caregiver Coaching",
    description:
      "You are the most important person in your child's development. Caregiver coaching teaches you — the parent, grandparent, or caregiver — specific, proven strategies to support your child's growth in the moments that matter most, from mealtime to bath time to play.",
    audience:
      "Parents, grandparents, foster caregivers, and anyone who spends regular time with an infant or toddler with a developmental concern. This service benefits the whole family.",
    benefits: [
      "Greater confidence in supporting your child's development",
      "Simple, research-backed strategies for everyday routines",
      "A stronger bond between caregiver and child",
    ],
    icon: <Heart className="h-7 w-7" />,
  },
  {
    title: "Service Coordination",
    description:
      "Navigating Early Intervention — paperwork, evaluations, appointments, transitions — can feel overwhelming. A dedicated service coordinator walks alongside your family from day one, making sure you understand every step and are connected to the right supports.",
    audience:
      "Every family enrolled in Early Intervention receives service coordination. No one should have to figure out the system alone.",
    benefits: [
      "One consistent point of contact who knows your family",
      "Help understanding your rights and your child's plan",
      "Connections to community resources and next-step services",
    ],
    icon: <LinkIcon className="h-7 w-7" />,
  },
  {
    title: "Special Instruction",
    description:
      "Special instruction brings structured, play-based learning to your child through activities designed for their individual goals. Sessions happen in your home or daycare setting and are built into routines your child already knows, so learning feels natural.",
    audience:
      "Children with delays in thinking, learning, social interaction, or daily self-help skills who benefit from targeted developmental activities in a familiar environment.",
    benefits: [
      "Cognitive and learning skills supported through play",
      "Activities embedded into your child's everyday routines",
      "Whole-family involvement in every session",
    ],
    icon: <Brain className="h-7 w-7" />,
  },
  {
    title: "Behavioral Support",
    description:
      "When a young child struggles with big emotions, frequent meltdowns, or challenging behaviors, it can be hard on the whole family. Our behavioral support services give caregivers positive, practical tools to understand and guide their child's social-emotional growth.",
    audience:
      "Toddlers and infants showing difficult behaviors, emotional dysregulation, or social challenges — and the caregivers supporting them through it.",
    benefits: [
      "Calmer, more predictable routines at home",
      "Positive strategies that replace punishment with understanding",
      "Progress in your child's emotional awareness and self-regulation",
    ],
    icon: <Smile className="h-7 w-7" />,
  },
  {
    title: "Nutrition & Feeding Support",
    description:
      "Mealtime challenges — refusing foods, trouble transitioning to solids, poor weight gain — are some of the most stressful things a family can face. Our specialists assess your child's feeding patterns and coach caregivers on approaches that make mealtimes safer and more enjoyable.",
    audience:
      "Infants and toddlers with feeding difficulties, food refusal, oral motor concerns, or worries about nutrition and healthy growth.",
    benefits: [
      "Safer, more positive mealtime experiences",
      "Expert support for oral motor and swallowing challenges",
      "Practical guidance on nutrition and healthy feeding habits",
    ],
    icon: <Utensils className="h-7 w-7" />,
  },
  {
    title: "Early Childhood Mental Health Consultation",
    description:
      "A child's emotional health in the earliest years shapes everything — how they learn, relate to others, and cope with life. This service supports infants and toddlers whose social-emotional wellbeing needs attention, and helps caregivers who are experiencing high stress, bonding challenges, or uncertainty.",
    audience:
      "Families experiencing stress or bonding difficulties, and infants or toddlers who show early signs of social-emotional concerns or who have experienced adversity.",
    benefits: [
      "Support for caregiver mental health and wellbeing",
      "Stronger parent-child relationship and attachment",
      "Early identification and support for infant mental health needs",
    ],
    icon: <ShieldAlert className="h-7 w-7" />,
  },
];

export default function ServicesPage() {
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
              Our Services
            </h1>

            <p className="text-xl leading-relaxed text-muted-foreground">
              Every service we offer is designed to support your child in the
              place where they already live, learn, and play — at home, in
              daycare, or in the community. All at no cost to most families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="flex h-full flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.04, 0.2),
                }}
              >
                <Card className="group flex h-full flex-col overflow-hidden border border-border shadow-sm transition-colors hover:border-primary/40">
                  <div className="h-1.5 w-full bg-gradient-to-r from-primary/50 to-secondary/50" />

                  <CardContent className="flex flex-grow flex-col gap-6 p-8">
                    {/* TITLE */}
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        {service.icon}
                      </div>

                      <h2 className="pt-1 font-serif text-xl font-bold leading-snug text-foreground">
                        {service.title}
                      </h2>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                    {/* AUDIENCE */}
                    <div className="rounded-xl border border-secondary/20 bg-secondary/10 p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 shrink-0 text-secondary-foreground" />

                        <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                          Who this helps
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {service.audience}
                      </p>
                    </div>

                    {/* BENEFITS */}
                    <div className="flex-grow">
                      <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-foreground">
                        Benefits
                      </span>

                      <ul className="space-y-2">
                        {service.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* REFERRAL CTA */}
                    <div className="mt-auto border-t border-border pt-5">
                      <Link href="/referral">
                        <Button className="w-full rounded-full bg-primary font-semibold text-white hover:bg-primary/90">
                          Make a Referral for this Service
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
              Not sure which service fits?
            </h2>

            <p className="mb-8 text-lg text-muted-foreground">
              That&apos;s completely okay. Our team will help figure out
              exactly what your child needs — just reach out and we&apos;ll
              guide you from there.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/referral">
                <Button
                  size="lg"
                  className="h-14 w-full rounded-full bg-primary px-8 text-lg font-semibold text-white hover:bg-primary/90 sm:w-auto"
                >
                  Make a Referral
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 w-full rounded-full border-primary/30 px-8 text-lg text-primary hover:bg-primary/10 sm:w-auto"
                >
                  Ask Us a Question
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}