import { NextResponse } from "next/server";
import plantsData from "@/app/data/plants.json"
export async function GET() {
    return NextResponse.json(plantsData)
}