ALTER TABLE "listings" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_slug_unique" UNIQUE("slug");