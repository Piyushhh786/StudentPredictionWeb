"use server";
import { NextResponse} from "next/server";
import {db} from '@/db/drizzle';
import {table} from '@/db/schema';
import { parse } from "path";
export async function POST(req: Request) {
    try {
        const { features, result } = await req.json();
        
        const getInt = (val: string | undefined, field: string) => {
            const parsed = parseInt(val ?? '');
            return isNaN(parsed) ? 0 : parsed; // Added NaN check
        };
        
        const formTable = {
            hrsStudied: getInt(features['Hours Studied'], 'Hours Studied'),
            prevScores: getInt(features['Previous Scores'], 'Previous Scores'),
            activities: features['Extracurricular Activities'] === 'Yes' ? 1 : 0,
            sleepHours: getInt(features['Sleep Hours'], 'Sleep Hours'),
            solvedPaper: getInt(features['Sample Question Papers Practiced'], 'Sample Question Papers Practiced'),
            performanceIndex: Math.round(result),
        };
        
        const query = await db.insert(table).values(formTable);
        console.log(query);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch(err) {
        console.log(err);
        return NextResponse.json({ error: "DB Insert failed", details: err }, { status: 500 });
    }
}