"use server";
import { NextResponse} from "next/server";
import {db} from '@/db/drizzle';
import {table} from '@/db/schema';
import { formSchema } from "@/lib/zodSchema";
export async function POST(req: Request) {
    try {
        const { features, result } = await req.json();
        const parsed = formSchema.parse({features});
        console.log(parsed);
        const getInt = (val: string | undefined) => {
            const parsed = parseInt(val ?? '');
            return isNaN(parsed) ? 0 : parsed; // Added NaN check
        };
        
        const formTable = {
            hrsStudied: getInt(features['Hours Studied']),
            prevScores: getInt(features['Previous Scores']),
            activities: features['Extracurricular Activities'] === 'Yes' ? 1 : 0,
            sleepHours: getInt(features['Sleep Hours']),
            solvedPaper: getInt(features['Sample Question Papers Practiced']),
            performanceIndex: Math.round(result),
        };
        
        await db.insert(table).values(formTable);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch(err) {
        console.log(err);
        return NextResponse.json({ error: "DB Insert failed", details: err }, { status: 500 });
    }
}