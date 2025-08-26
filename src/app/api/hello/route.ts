import { api } from '@/libs/api';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await api.get('')
  console.log("🚀 ~ GET ~ res:", res)
  return NextResponse.json({ message: 'Hello, world!' });
}