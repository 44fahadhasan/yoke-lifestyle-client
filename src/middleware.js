import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware executed", { request });
  return NextResponse.next();
}
