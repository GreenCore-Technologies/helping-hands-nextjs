"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Mail,
  Map,
  MapPin,
  Phone,
} from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// PLACEHOLDER — replace with confirmed business email before launch.
const BUSINESS_EMAIL = "info@helpinghandshcbs.com";

const BUSINESS_HOURS = [
  { day: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" },
];

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),

  email: z
    .string()
    .email("Please enter a valid email address (e.g. name@example.com)."),

  phone: z
    .string()
    .min(10, "Please enter a valid phone number (at least 10 digits).")
    .regex(
      /^[\d\s\-().+]+$/,
      "Phone number can only contain digits, spaces, and ( ) - + characters.",
    ),

  message: z
    .string()
    .min(5, "Please share a brief message so we know how to help."),

  consent: z.boolean().refine((value) => value === true, {
    message:
      "Please check this box to confirm you consent to being contacted.",
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          website: "",
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };

        setSubmitError(
          data.error ??
            "Something went wrong. Please try again or call us at 251-288-0194.",
        );

        return;
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError(
        "We couldn't send your message right now. Please try again or call us directly at 251-288-0194.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    form.reset();
    setIsSubmitted(false);
    setSubmitError(null);
  }

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
              Contact Us
            </h1>

            <p className="text-xl leading-relaxed text-muted-foreground">
              We&apos;re here to answer your questions, guide you through the
              referral process, or just have a conversation. Reach out in
              whatever way is easiest for you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* CONTACT INFORMATION */}
            <motion.div
              className="space-y-10 lg:col-span-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Get in Touch
              </h2>

              {/* PHONE */}
              <div className="group flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Phone size={22} />
                </div>

                <div>
                  <h3 className="mb-1 text-lg font-bold text-foreground">
                    Phone
                  </h3>

                  <a
                    href="tel:2512880194"
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    251-288-0194
                  </a>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Tap to call directly from your phone.
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="group flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Mail size={22} />
                </div>

                <div>
                  <h3 className="mb-1 text-lg font-bold text-foreground">
                    Email
                  </h3>

                  <a
                    href={`mailto:${BUSINESS_EMAIL}`}
                    className="break-all text-lg font-semibold text-primary hover:underline"
                  >
                    {BUSINESS_EMAIL}
                  </a>

                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-amber-600">
                    PLACEHOLDER — replace with real email
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    We typically respond within 1–2 business days.
                  </p>
                </div>
              </div>

              {/* HOURS */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock size={22} />
                </div>

                <div className="w-full">
                  <h3 className="mb-3 text-lg font-bold text-foreground">
                    Business Hours
                  </h3>

                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-amber-600">
                    PLACEHOLDER — confirm hours with provider
                  </p>

                  <table
                    className="w-full text-sm"
                    aria-label="Business hours"
                  >
                    <tbody>
                      {BUSINESS_HOURS.map(({ day, hours }) => (
                        <tr
                          key={day}
                          className="border-b border-border/50 last:border-0"
                        >
                          <th
                            scope="row"
                            className="py-2 pr-6 text-left font-medium text-foreground"
                          >
                            {day}
                          </th>

                          <td
                            className={`py-2 ${
                              hours === "Closed"
                                ? "text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {hours}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SERVICE AREA */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    Service Area
                  </h3>

                  <p className="leading-relaxed text-muted-foreground">
                    We serve families throughout{" "}
                    <strong className="text-foreground">Mobile County</strong>,{" "}
                    <strong className="text-foreground">
                      Washington County
                    </strong>
                    ,{" "}
                    <strong className="text-foreground">
                      Escambia County
                    </strong>
                    , <strong className="text-foreground">Clarke County</strong>,
                    and surrounding Southwest Alabama communities.
                  </p>

                  <p className="mt-2 text-sm italic text-muted-foreground">
                    All services are delivered in the child&apos;s natural
                    environment — at home, in daycare, or in the community.
                  </p>
                </div>
              </div>

              {/* REFERRAL CTA */}
              <div className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Ready to get started?
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  Skip the back-and-forth and submit a referral directly.
                  We&apos;ll take it from there.
                </p>

                <Link href="/referral">
                  <Button className="mt-1 w-full rounded-full bg-primary font-semibold text-white hover:bg-primary/90">
                    Request Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* CONTACT FORM */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Card className="overflow-hidden border border-border/50 shadow-lg">
                <div className="h-1.5 w-full bg-gradient-to-r from-primary/50 to-secondary/50" />

                <CardContent className="p-7 md:p-10">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 text-center"
                    >
                      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white">
                        <CheckCircle size={38} />
                      </div>

                      <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                        Message Received
                      </h3>

                      <p className="mb-2 text-lg text-muted-foreground">
                        Thank you for reaching out to Helping Hands.
                      </p>

                      <p className="mb-8 text-muted-foreground">
                        A team member will follow up within{" "}
                        <strong className="text-foreground">
                          1–2 business days
                        </strong>
                        . If your matter is urgent, call us at{" "}
                        <a
                          href="tel:2512880194"
                          className="font-semibold text-primary hover:underline"
                        >
                          251-288-0194
                        </a>
                        .
                      </p>

                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="rounded-full border-primary/30 px-8 text-primary hover:bg-primary/10"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                        noValidate
                      >
                        <h3 className="font-serif text-2xl font-bold text-foreground">
                          Send a Message
                        </h3>

                        {/* NAME */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Full Name{" "}
                                <span className="text-destructive">*</span>
                              </FormLabel>

                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  autoComplete="name"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* EMAIL + PHONE */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Email Address{" "}
                                  <span className="text-destructive">*</span>
                                </FormLabel>

                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Phone Number{" "}
                                  <span className="text-destructive">*</span>
                                </FormLabel>

                                <FormControl>
                                  <Input
                                    type="tel"
                                    placeholder="(251) 555-0100"
                                    autoComplete="tel"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* MESSAGE */}
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Message{" "}
                                <span className="text-destructive">*</span>
                              </FormLabel>

                              <FormControl>
                                <Textarea
                                  placeholder="How can we help you? Ask a question, request information about services, or let us know what's on your mind."
                                  className="min-h-[130px] resize-y"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* CONSENT */}
                        <Controller
                          control={form.control}
                          name="consent"
                          render={({ field, fieldState }) => (
                            <div className="space-y-2">
                              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                                <Checkbox
                                  id="contact-consent"
                                  checked={field.value}
                                  onCheckedChange={(checked) =>
                                    field.onChange(checked === true)
                                  }
                                  className="mt-0.5 shrink-0 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                                />

                                <label
                                  htmlFor="contact-consent"
                                  className="cursor-pointer select-none text-sm leading-relaxed text-foreground"
                                >
                                  I consent to being contacted by Helping Hands
                                  Home &amp; Community Based Services in
                                  response to this message. My information will
                                  not be shared without my permission.{" "}
                                  <span className="font-medium text-destructive">
                                    *
                                  </span>
                                </label>
                              </div>

                              {fieldState.error && (
                                <p className="px-1 text-sm font-medium text-destructive">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </div>
                          )}
                        />

                        {/* SERVER ERROR */}
                        {submitError && (
                          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                            {submitError}
                          </div>
                        )}

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="h-14 w-full rounded-full bg-primary text-lg font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
                        >
                          {isSubmitting ? "Sending…" : "Send Message"}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                          Fields marked{" "}
                          <span className="font-medium text-destructive">*</span>{" "}
                          are required.
                        </p>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* MAP PLACEHOLDER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-3">
              <Map className="h-6 w-6 text-primary" />

              <h2 className="font-serif text-2xl font-bold text-foreground">
                Our Area
              </h2>
            </div>

            <div className="flex h-72 w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground md:h-96">
              <MapPin className="h-10 w-10 text-muted-foreground/40" />

              <div className="px-6 text-center">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  MAP PLACEHOLDER
                </p>

                <p className="text-sm">
                  Serving Mobile County, Washington County, Escambia County,
                  Clarke County, and surrounding Southwest Alabama communities.
                </p>

                <p className="mt-2 text-xs italic">
                  Embed will be added once the office address is confirmed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}