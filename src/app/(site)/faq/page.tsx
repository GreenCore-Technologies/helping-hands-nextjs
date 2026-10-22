"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ClipboardList,
  FileText,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  q: string;
  a: ReactNode;
  placeholder?: boolean;
}

interface FaqSection {
  heading: string;
  items: FaqItem[];
}

const faqSections: FaqSection[] = [
  {
    heading: "Who Qualifies for Services",
    items: [
      {
        q: "Who is eligible for Early Intervention services?",
        a: (
          <>
            Children from birth through 35 months (up to, but not including,
            their third birthday) may be eligible if they have a measurable
            delay in one or more developmental areas — physical, cognitive,
            communication, social-emotional, or adaptive — or if they have a
            diagnosed condition known to cause developmental delays (such as
            Down syndrome, cerebral palsy, or hearing loss). In some cases,
            children at significant biological or environmental risk may also
            qualify.{" "}
            <Link
              href="/eligibility"
              className="font-semibold text-primary hover:underline"
            >
              Read our full eligibility guide →
            </Link>
          </>
        ),
      },
      {
        q: "Does my child need a diagnosis to get started?",
        a: "No formal diagnosis is needed to make a referral or request a free evaluation. If you have a concern about your child's development, that is reason enough to reach out. Our team will conduct a thorough evaluation and let you know whether your child qualifies.",
      },
      {
        q: "Is there a cost to families?",
        a: (
          <>
            The evaluation to determine eligibility is always free. Most
            families receive services at no cost as well. A service coordinator
            will walk you through any funding details specific to your situation
            before services begin. No family is ever turned away due to an
            inability to pay.
            <span className="mt-2 block text-xs font-medium uppercase tracking-wider text-amber-600">
              PLACEHOLDER — confirm cost and funding details with agency
            </span>
          </>
        ),
        placeholder: true,
      },
    ],
  },
  {
    heading: "How Referrals Work",
    items: [
      {
        q: "Who can submit a referral?",
        a: (
          <>
            Anyone can refer a child — a parent, grandparent, foster caregiver,
            pediatrician, hospital, childcare provider, social worker, or any
            concerned community member. You do not need to be the child&apos;s
            parent to submit a referral. Parent or guardian consent is always
            required before an evaluation can take place.{" "}
            <Link
              href="/referral"
              className="font-semibold text-primary hover:underline"
            >
              Submit a referral now →
            </Link>
          </>
        ),
      },
      {
        q: "What happens step by step after I submit a referral?",
        a: (
          <ol className="ml-5 list-outside list-decimal space-y-2">
            <li>
              <strong>We contact you within 2 business days</strong> to
              introduce ourselves, answer any questions, and gather a little
              background information about your child.
            </li>
            <li>
              <strong>A free multidisciplinary evaluation is scheduled</strong>{" "}
              — typically in your home or another familiar setting. The
              evaluation looks at all areas of development and is conducted by
              qualified specialists.
            </li>
            <li>
              <strong>We determine eligibility</strong> together based on the
              evaluation results and share those findings with you clearly and
              completely.
            </li>
            <li>
              <strong>
                If eligible, we create an Individualized Family Service Plan
                (IFSP)
              </strong>{" "}
              together — a personalized plan that outlines your child&apos;s
              goals and the services that will support them.
            </li>
            <li>
              <strong>Services begin</strong> in your child&apos;s natural
              environment (home, daycare, or community), with you as an active
              partner.
            </li>
          </ol>
        ),
      },
      {
        q: "How long does the process take from referral to services?",
        a: (
          <>
            Federal law requires the evaluation to be completed within 45 days
            of the referral date. We work to move as quickly as possible — in
            most cases, our team makes initial contact within 2 business days of
            receiving your referral.
            <span className="mt-2 block text-xs font-medium uppercase tracking-wider text-amber-600">
              PLACEHOLDER — confirm typical timeline with agency
            </span>
          </>
        ),
        placeholder: true,
      },
    ],
  },
  {
    heading: "After You Submit a Form",
    items: [
      {
        q: "What happens after I submit the online referral form?",
        a: (
          <>
            A member of the Helping Hands team will review your submission and
            reach out to you within <strong>2 business days</strong> using your
            preferred contact method (phone, email, or text — whichever you
            selected on the form). If you do not hear back within that window,
            feel free to call us directly at{" "}
            <a
              href="tel:2512880194"
              className="font-semibold text-primary hover:underline"
            >
              251-288-0194
            </a>
            .
            <span className="mt-2 block text-xs font-medium uppercase tracking-wider text-amber-600">
              PLACEHOLDER — confirm internal response process with agency
            </span>
          </>
        ),
        placeholder: true,
      },
      {
        q: "What information do I need to have ready when someone calls me back?",
        a: "Don't worry about preparing anything special — we'll guide the conversation. It's helpful to have the child's date of birth handy and a general sense of the concerns you've noticed. You do not need paperwork, medical records, or a diagnosis ready for the initial call.",
      },
      {
        q: "Can I contact Helping Hands by phone instead of using the online form?",
        a: (
          <>
            Absolutely. Call us at{" "}
            <a
              href="tel:2512880194"
              className="font-semibold text-primary hover:underline"
            >
              251-288-0194
            </a>{" "}
            any time during business hours (Monday–Friday, 8:00 AM–5:00 PM).
            You can also use our{" "}
            <Link
              href="/contact"
              className="font-semibold text-primary hover:underline"
            >
              Contact page
            </Link>{" "}
            to send a message and we&apos;ll get back to you within 1–2
            business days.
          </>
        ),
      },
    ],
  },
  {
    heading: "Contacting Us & Service Area",
    items: [
      {
        q: "How do I contact Helping Hands?",
        a: (
          <>
            You can reach us several ways:
            <ul className="ml-5 mt-2 list-outside list-disc space-y-1">
              <li>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:2512880194"
                  className="font-semibold text-primary hover:underline"
                >
                  251-288-0194
                </a>{" "}
                (Monday–Friday, 8 AM–5 PM)
              </li>
              <li>
                <strong>Online form:</strong>{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-primary hover:underline"
                >
                  Contact page
                </Link>
              </li>
              <li>
                <strong>Referral form:</strong>{" "}
                <Link
                  href="/referral"
                  className="font-semibold text-primary hover:underline"
                >
                  Make a Referral
                </Link>
              </li>
            </ul>
            <p className="mt-2">
              We respond to all inquiries within 1–2 business days.
            </p>
          </>
        ),
      },
      {
        q: "Which areas do you serve?",
        a: (
          <>
            Helping Hands serves families throughout Southwest Alabama,
            including <strong>Mobile County</strong>,{" "}
            <strong>Washington County</strong>,{" "}
            <strong>Escambia County</strong>, <strong>Clarke County</strong>,
            and surrounding communities. All services are delivered in the
            child&apos;s natural environment — at home, in daycare, or in the
            community. If you&apos;re unsure whether your area is covered, call
            us and we&apos;ll let you know.
            <span className="mt-2 block text-xs font-medium uppercase tracking-wider text-amber-600">
              PLACEHOLDER — confirm exact service area boundaries with agency
            </span>
          </>
        ),
        placeholder: true,
      },
      {
        q: "What if I have an urgent concern about my child's development?",
        a: (
          <>
            If you have an urgent medical concern, please contact your
            child&apos;s pediatrician or call 911 for emergencies. For Early
            Intervention questions that feel time-sensitive, call us at{" "}
            <a
              href="tel:2512880194"
              className="font-semibold text-primary hover:underline"
            >
              251-288-0194
            </a>{" "}
            during business hours and we will do our best to respond the same
            day.
          </>
        ),
      },
    ],
  },
  {
    heading: "Privacy & Confidentiality",
    items: [
      {
        q: "Is my family's information kept private?",
        a: (
          <>
            Yes. All information shared with Helping Hands — including the
            child&apos;s name, family details, evaluation results, and service
            records — is kept strictly confidential. We do not share your
            information with anyone outside the Early Intervention team without
            your written consent, except as required by law.
            <span className="mt-2 block text-xs font-medium uppercase tracking-wider text-amber-600">
              PLACEHOLDER — review with agency/legal before publishing
            </span>
          </>
        ),
        placeholder: true,
      },
      {
        q: "Who has access to my child's records?",
        a: (
          <>
            Access to your child&apos;s records is limited to the Early
            Intervention professionals directly involved in their care, and to
            you as the parent or legal guardian. You have the right to review
            and receive copies of your child&apos;s records at any time.
            Records are not shared with schools, insurance companies, or other
            agencies without your written permission.
            <span className="mt-2 block text-xs font-medium uppercase tracking-wider text-amber-600">
              PLACEHOLDER — confirm records policy with agency/legal before
              publishing
            </span>
          </>
        ),
        placeholder: true,
      },
      {
        q: "Do I need to worry about immigration status or public benefits to receive services?",
        a: (
          <>
            Early Intervention services are available to all eligible children
            regardless of immigration status. Participating in Early
            Intervention does not affect immigration status and is not
            considered a &quot;public charge&quot; under federal immigration
            rules. We encourage every family to reach out without fear.
            <span className="mt-2 block text-xs font-medium uppercase tracking-wider text-amber-600">
              PLACEHOLDER — confirm with agency/legal before publishing
            </span>
          </>
        ),
        placeholder: true,
      },
    ],
  },
  {
    heading: "About Early Intervention",
    items: [
      {
        q: "What is Early Intervention?",
        a: "Early Intervention (EI) is a federally mandated program under the Individuals with Disabilities Education Act (IDEA, Part C) that provides services and support to infants and toddlers (birth through age 2) and their families when a child has or is at risk of a developmental delay or disability. Services focus on the child's natural environments and are designed to strengthen the family's ability to support development in everyday routines.",
      },
      {
        q: "What does 'natural environment' mean?",
        a: "A natural environment is any setting that is typical for a child without a disability — most often the family home, a daycare or childcare setting, or the community. Early Intervention is most effective when services happen in the places where children already live, learn, and play, rather than in a clinic.",
      },
      {
        q: "Is Early Intervention the same as special education?",
        a: "No. Early Intervention serves children from birth to age 3 and is guided by an Individualized Family Service Plan (IFSP) focused on family-centered outcomes. Special education begins at age 3 and is governed by an Individualized Education Program (IEP) through the school system. We help families navigate this transition when the time comes.",
      },
    ],
  },
  {
    heading: "Services & Support",
    items: [
      {
        q: "What types of services does Helping Hands provide?",
        a: (
          <>
            We offer a full range of Early Intervention services —
            speech-language therapy, occupational therapy, physical therapy,
            special instruction, caregiver coaching, behavioral support,
            nutrition and feeding support, service coordination, and early
            childhood mental health consultation. Services are tailored to each
            child&apos;s individual plan.{" "}
            <Link
              href="/services"
              className="font-semibold text-primary hover:underline"
            >
              See all services →
            </Link>
          </>
        ),
      },
      {
        q: "How often will a therapist or specialist visit?",
        a: "Service frequency is determined collaboratively by your family and the Early Intervention team based on your child's individual goals. Visits may range from weekly to monthly — whatever best supports your child's progress. Everything is documented in the IFSP and can be adjusted as your child grows.",
      },
      {
        q: "What is caregiver coaching and why does it matter?",
        a: "Caregiver coaching means our specialists teach and coach you — the parent, grandparent, or caregiver — to support your child's development throughout daily routines, not just during therapy visits. Research consistently shows that children make faster and more lasting progress when caregivers are empowered to reinforce strategies every day. You are the most important person in your child's development.",
      },
      {
        q: "What happens when my child turns 3?",
        a: "At age 3, a child transitions out of Early Intervention. Transition planning typically begins at least 6 months before the child's third birthday. Depending on continued needs, your child may transition to a public preschool special education program or other community services. We support families through the full transition process.",
      },
    ],
  },
];

const howItWorksSteps = [
  {
    icon: <Phone className="h-6 w-6" />,
    num: "01",
    title: "Reach Out",
    desc: "Call us, submit the online referral form, or have a doctor or childcare provider refer your child. No diagnosis is needed.",
  },
  {
    icon: <ClipboardList className="h-6 w-6" />,
    num: "02",
    title: "We Contact You",
    desc: "A team member reaches out within 2 business days to answer your questions and gather a little background information.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    num: "03",
    title: "Free Evaluation",
    desc: "Qualified specialists meet with your child — usually at home or in daycare — and evaluate all areas of development at no cost.",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    num: "04",
    title: "Services Begin",
    desc: "If eligible, we create a plan together and services start in your child's natural environment, with you as an active partner.",
  },
];

export default function FAQPage() {
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
            <h1 className="mb-5 font-serif text-4xl font-bold text-foreground md:text-5xl">
              Frequently Asked Questions
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
              Answers to the questions families, caregivers, and referral
              partners ask most often about Early Intervention and Helping
              Hands.
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                "No diagnosis needed to reach out",
                "Free evaluation for all children",
                "No family turned away",
              ].map((note) => (
                <div
                  key={note}
                  className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                  {note}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 font-serif text-2xl font-bold text-white md:text-3xl">
              How It Works
            </h2>

            <p className="mx-auto max-w-xl text-lg text-primary-foreground/80">
              Getting started is simpler than you might think. Here&apos;s what
              to expect from first contact to services beginning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.num}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.08, 0.24),
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    {step.icon}
                  </div>

                  <span className="text-sm font-bold tracking-wider text-white/50">
                    {step.num}
                  </span>
                </div>

                <h3 className="mb-2 font-serif text-lg font-bold">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-white/80">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/referral">
              <Button
                size="lg"
                className="h-14 rounded-full bg-white px-8 font-semibold text-primary shadow-lg hover:bg-white/90"
              >
                Make a Referral
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-14">
            {faqSections.map((section, sectionIndex) => (
              <motion.section
                key={section.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: sectionIndex * 0.04,
                }}
              >
                <h2 className="mb-6 border-b border-border pb-3 font-serif text-2xl font-bold text-foreground">
                  {section.heading}
                </h2>

                <Accordion type="single" collapsible className="space-y-3">
                  {section.items.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faq.q}
                      value={`s${sectionIndex}-f${faqIndex}`}
                      className="rounded-xl border border-border bg-card px-6 shadow-sm transition-colors data-[state=open]:border-primary/30"
                    >
                      <AccordionTrigger className="gap-3 py-5 text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline">
                        <span>{faq.q}</span>

                        {faq.placeholder && (
                          <span className="ml-auto mr-3 shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                            Needs review
                          </span>
                        )}
                      </AccordionTrigger>

                      <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.section>
            ))}

            {/* PRIVACY STATEMENT */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4 rounded-2xl border border-secondary/30 bg-secondary/10 p-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-7 w-7 shrink-0 text-primary" />

                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Our Privacy Commitment
                  </h2>
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  PLACEHOLDER — review with agency/legal before publishing
                </p>

                <p className="leading-relaxed text-muted-foreground">
                  Helping Hands Home &amp; Community Based Services, LLC is
                  committed to protecting the privacy of every family we serve.
                  All personal information, evaluation results, and service
                  records are kept confidential and are used only to provide
                  and coordinate your child&apos;s Early Intervention services.
                </p>

                <p className="leading-relaxed text-muted-foreground">
                  We will never share your information with outside parties —
                  including schools, employers, insurance companies, or
                  government agencies — without your written consent, except as
                  required by applicable law. As a parent or legal guardian,
                  you have the right to access, review, and request corrections
                  to your child&apos;s records at any time.
                </p>

                <p className="leading-relaxed text-muted-foreground">
                  If you have any questions about how your information is
                  handled, please contact us at{" "}
                  <a
                    href="tel:2512880194"
                    className="font-semibold text-primary hover:underline"
                  >
                    251-288-0194
                  </a>{" "}
                  or visit our{" "}
                  <Link
                    href="/contact"
                    className="font-semibold text-primary hover:underline"
                  >
                    Contact page
                  </Link>
                  .
                </p>
              </div>
            </motion.section>

            {/* FINAL CTA */}
            <motion.div
              className="rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                Still have questions?
              </h3>

              <p className="mb-8 text-lg text-muted-foreground">
                We&apos;re happy to help — by phone, email, or online form. No
                question is too small.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="h-14 w-full rounded-full bg-primary px-8 font-semibold text-white hover:bg-primary/90 sm:w-auto"
                  >
                    Contact Us
                  </Button>
                </Link>

                <Link href="/referral">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 w-full rounded-full border-primary/30 px-8 font-semibold text-primary hover:bg-primary/10 sm:w-auto"
                  >
                    Make a Referral
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}