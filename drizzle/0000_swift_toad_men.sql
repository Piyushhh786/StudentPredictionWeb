CREATE TABLE "table" (
	"id" serial PRIMARY KEY NOT NULL,
	"hrs_studied" integer NOT NULL,
	"previous_scores" integer NOT NULL,
	"extracurricular_activities" integer NOT NULL,
	"sleep_hours" integer NOT NULL,
	"solved_papers" integer DEFAULT 0,
	"performance_index" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
