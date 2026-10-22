"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Info,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fadeIn } from "@/lib/animations";

const SERVICE_OPTIONS = [
  "Developmental Monitoring & Surveillance",
  "Speech-Language Therapy",
  "Occupational Therapy",
  "Physical Therapy",
  "Caregiver Coaching",
  "Service Coordination",
  "Special Instruction",
  "Behavioral Support",
  "Nutrition & Feeding Support",
  "Early Childhood Mental Health Consultation",
  "Not sure — help me figure it out",
];

const CONTACT_METHODS = [
  {
    value: "phone",
    label: "Phone call",
    icon: Phone,
  },
  {
    value: "email",
    label: "Email",
    icon: Mail,
  },
  {
    value: "text",
    label: "Text message",
    icon: MessageSquare,
  },
];

const formSchema = z.object({
  clientName: z
    .string()
    .trim()
    .min(2, "Please enter the applicant or child's name.")
    .max(200),

  guardianName: z
    .string()
    .trim()
    .min(2, "Please enter a parent or guardian name.")
    .max(200),

  phone: z
    .string()
    .trim()
    .min(
      10,
      "Please enter a valid phone number (at least 10 digits).",
    )
    .max(30)
    .regex(
      /^[\d\s\-().+]+$/,
      "Phone number can only contain digits, spaces, and ( ) - + characters.",
    ),

  email: z
    .string()
    .trim()
    .email(
      "Please enter a valid email address (e.g. name@example.com).",
    )
    .max(300),

  serviceArea: z
    .string()
    .trim()
    .min(
      3,
      "Please enter your address or the general area you live in.",
    )
    .max(300),

  serviceNeeded: z
    .string()
    .min(
      1,
      'Please select a service, or choose "Not sure" and we\'ll help.',
    )
    .max(200),

  contactMethod: z
    .string()
    .min(
      1,
      "Please let us know how you'd prefer to be reached.",
    )
    .max(50),

  message: z
    .string()
    .trim()
    .max(5000)
    .optional(),

  consent: z.boolean().refine((value) => value === true, {
    message:
      "Please check this box to confirm you consent to being contacted.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReferralPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submitError, setSubmitError] =
    useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      guardianName: "",
      phone: "",
      email: "",
      serviceArea: "",
      serviceNeeded: "",
      contactMethod: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/referral", {
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
        const data = (await response
          .json()
          .catch(() => ({}))) as {
          error?: string;
        };

        setSubmitError(
          data.error ??
            "Something went wrong. Please try again or call us at 251-288-0194.",
        );

        return;
      }

      setSubmittedName(values.clientName);
      setIsSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch {
      setSubmitError(
        "We couldn't send your referral right now. Please try again or call us directly at 251-288-0194.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    form.reset();
    setIsSubmitted(false);
    setSubmittedName("");
    setSubmitError(null);
  }

  return (
    <>
      {/* Page Header */}
      <section className="border-b bg-muted py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            {...fadeIn}
          >
            <h1 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
              Make a Referral
            </h1>

            <p className="text-xl text-muted-foreground">
              Take the first step toward getting a child the
              support they deserve. This form can be completed by
              families, physicians, childcare providers, and
              community agencies.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            {isSubmitted ? (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                className="rounded-2xl border border-accent/30 bg-accent/10 p-10 text-center"
                data-testid="referral-success"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white">
                  <CheckCircle size={40} />
                </div>

                <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">
                  Referral Received
                </h2>

                <p className="mb-2 text-lg text-muted-foreground">
                  Thank you for referring
                  {submittedName
                    ? ` ${submittedName}`
                    : " this child"}{" "}
                  to Helping Hands.
                </p>

                <p className="mb-8 text-muted-foreground">
                  A member of our team will reach out within{" "}
                  <strong className="text-foreground">
                    2 business days
                  </strong>{" "}
                  using your preferred contact method. If you have
                  an urgent concern, call us directly at{" "}
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
                  data-testid="submit-another"
                >
                  Submit Another Referral
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Information Banner */}
                <div className="mb-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                  <p className="text-sm leading-relaxed text-foreground">
                    No diagnosis is needed to make a referral. The
                    evaluation is always free to families. If
                    you&apos;re unsure whether a child qualifies,{" "}
                    <Link
                      href="/eligibility"
                      className="font-semibold text-primary hover:underline"
                    >
                      read our eligibility guide
                    </Link>{" "}
                    or call us at{" "}
                    <a
                      href="tel:2512880194"
                      className="font-semibold text-primary hover:underline"
                    >
                      251-288-0194
                    </a>
                    .
                  </p>
                </div>

                <Card
                  className="border-border/50 shadow-md"
                  data-testid="referral-form-card"
                >
                  <CardContent className="p-6 md:p-10">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-10"
                        noValidate
                      >
                        {/* Child / Applicant */}
                        <fieldset className="space-y-6">
                          <legend className="w-full border-b border-border pb-2 font-serif text-lg font-bold text-foreground">
                            About the Child or Applicant
                          </legend>

                          <FormField
                            control={form.control}
                            name="clientName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Applicant / Child&apos;s Name{" "}
                                  <span className="text-destructive">
                                    *
                                  </span>
                                </FormLabel>

                                <FormControl>
                                  <Input
                                    placeholder="Full name of the child or person being referred"
                                    autoComplete="name"
                                    {...field}
                                    data-testid="field-clientName"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="serviceArea"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Address or Service Area{" "}
                                  <span className="text-destructive">
                                    *
                                  </span>
                                </FormLabel>

                                <FormControl>
                                  <Input
                                    placeholder="e.g. 123 Main St, Mobile, AL — or just the city/county"
                                    autoComplete="street-address"
                                    {...field}
                                    data-testid="field-serviceArea"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="serviceNeeded"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Type of Service Needed{" "}
                                  <span className="text-destructive">
                                    *
                                  </span>
                                </FormLabel>

                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger data-testid="field-serviceNeeded">
                                      <SelectValue placeholder="Select a service…" />
                                    </SelectTrigger>
                                  </FormControl>

                                  <SelectContent>
                                    {SERVICE_OPTIONS.map(
                                      (service) => (
                                        <SelectItem
                                          key={service}
                                          value={service}
                                        >
                                          {service}
                                        </SelectItem>
                                      ),
                                    )}
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </fieldset>

                        {/* Contact Information */}
                        <fieldset className="space-y-6">
                          <legend className="w-full border-b border-border pb-2 font-serif text-lg font-bold text-foreground">
                            Contact Information
                          </legend>

                          <FormField
                            control={form.control}
                            name="guardianName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Parent / Guardian / Contact Name{" "}
                                  <span className="text-destructive">
                                    *
                                  </span>
                                </FormLabel>

                                <FormControl>
                                  <Input
                                    placeholder="Your full name"
                                    autoComplete="name"
                                    {...field}
                                    data-testid="field-guardianName"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Phone Number{" "}
                                    <span className="text-destructive">
                                      *
                                    </span>
                                  </FormLabel>

                                  <FormControl>
                                    <Input
                                      type="tel"
                                      placeholder="(251) 555-0100"
                                      autoComplete="tel"
                                      {...field}
                                      data-testid="field-phone"
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Email Address{" "}
                                    <span className="text-destructive">
                                      *
                                    </span>
                                  </FormLabel>

                                  <FormControl>
                                    <Input
                                      type="email"
                                      placeholder="you@example.com"
                                      autoComplete="email"
                                      {...field}
                                      data-testid="field-email"
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="contactMethod"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Preferred Contact Method{" "}
                                  <span className="text-destructive">
                                    *
                                  </span>
                                </FormLabel>

                                <FormControl>
                                  <RadioGroup
                                    onValueChange={
                                      field.onChange
                                    }
                                    value={field.value}
                                    className="flex flex-col gap-3 pt-1 sm:flex-row"
                                    data-testid="field-contactMethod"
                                  >
                                    {CONTACT_METHODS.map(
                                      (method) => {
                                        const Icon =
                                          method.icon;

                                        const selected =
                                          field.value ===
                                          method.value;

                                        return (
                                          <label
                                            key={
                                              method.value
                                            }
                                            htmlFor={`contact-${method.value}`}
                                            className={`flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl border px-5 py-3.5 transition-colors ${
                                              selected
                                                ? "border-primary bg-primary/5 text-primary"
                                                : "border-border bg-background text-foreground hover:border-primary/40"
                                            }`}
                                          >
                                            <RadioGroupItem
                                              value={
                                                method.value
                                              }
                                              id={`contact-${method.value}`}
                                              className="sr-only"
                                            />

                                            <span
                                              className={
                                                selected
                                                  ? "text-primary"
                                                  : "text-muted-foreground"
                                              }
                                            >
                                              <Icon className="h-4 w-4" />
                                            </span>

                                            <span className="text-sm font-medium">
                                              {
                                                method.label
                                              }
                                            </span>
                                          </label>
                                        );
                                      },
                                    )}
                                  </RadioGroup>
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </fieldset>

                        {/* Additional Details */}
                        <fieldset className="space-y-6">
                          <legend className="w-full border-b border-border pb-2 font-serif text-lg font-bold text-foreground">
                            Additional Details
                          </legend>

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Message or Details{" "}
                                  <span className="font-normal text-muted-foreground">
                                    (optional)
                                  </span>
                                </FormLabel>

                                <FormControl>
                                  <Textarea
                                    placeholder="Tell us anything helpful — the child's age, areas of concern, current services, or questions you have. No detail is too small."
                                    className="min-h-[120px] resize-y"
                                    {...field}
                                    data-testid="field-message"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </fieldset>

                        {/* Consent */}
                        <Controller
                          control={form.control}
                          name="consent"
                          render={({
                            field,
                            fieldState,
                          }) => (
                            <div className="space-y-2">
                              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-5">
                                <Checkbox
                                  id="consent"
                                  checked={field.value}
                                  onCheckedChange={
                                    field.onChange
                                  }
                                  className="mt-0.5 shrink-0 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                                  data-testid="field-consent"
                                />

                                <label
                                  htmlFor="consent"
                                  className="cursor-pointer select-none text-sm leading-relaxed text-foreground"
                                >
                                  I consent to being
                                  contacted by Helping Hands
                                  Home &amp; Community Based
                                  Services regarding this
                                  referral. I understand that
                                  my information will be used
                                  only to respond to this
                                  request and will not be
                                  shared without my
                                  permission.{" "}
                                  <span className="font-medium text-destructive">
                                    *
                                  </span>
                                </label>
                              </div>

                              {fieldState.error && (
                                <p className="px-1 text-sm font-medium text-destructive">
                                  {
                                    fieldState.error
                                      .message
                                  }
                                </p>
                              )}
                            </div>
                          )}
                        />

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
                          data-testid="referral-submit"
                        >
                          {isSubmitting
                            ? "Submitting…"
                            : "Submit Referral"}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                          Fields marked{" "}
                          <span className="font-medium text-destructive">
                            *
                          </span>{" "}
                          are required. Questions? Call us
                          at{" "}
                          <a
                            href="tel:2512880194"
                            className="font-semibold text-primary hover:underline"
                          >
                            251-288-0194
                          </a>
                          .
                        </p>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}