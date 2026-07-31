import { NextResponse } from "next/server";
import { db } from "@/db";
import { inventory } from "@/db/schema";

export async function GET() {
  try {
    const items = await db.select().from(inventory);
    const hasInventory = items && items.length > 0;
    return NextResponse.json({
      items: items || [],
      count: items ? items.length : 0,
      hasInventory,
    });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return NextResponse.json({
      items: [],
      count: 0,
      hasInventory: false,
    });
  }
}
