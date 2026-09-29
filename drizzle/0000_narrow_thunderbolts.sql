CREATE TABLE "contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(300) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"message" text NOT NULL,
	"consent_given" boolean DEFAULT true NOT NULL,
	"ip_address" varchar(64),
	"status" varchar(20) DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referral_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_name" varchar(200) NOT NULL,
	"guardian_name" varchar(200) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"email" varchar(300) NOT NULL,
	"service_area" varchar(300) NOT NULL,
	"service_needed" varchar(200) NOT NULL,
	"contact_method" varchar(50) NOT NULL,
	"message" text,
	"consent_given" boolean DEFAULT true NOT NULL,
	"ip_address" varchar(64),
	"status" varchar(20) DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
