import { pgTable, serial, integer,timestamp } from 'drizzle-orm/pg-core';

export const table = pgTable('table', {
  id: serial('id').primaryKey(),

  hrsStudied: integer('hrs_studied').notNull(),
  prevScores: integer('previous_scores').notNull(),
  activities: integer('extracurricular_activities').notNull(),

  sleepHours: integer('sleep_hours')
    .notNull(),
  solvedPaper: integer('solved_papers').default(0),
  performanceIndex: integer('performance_index'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
