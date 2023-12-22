import { NextRequest, NextResponse } from 'next/server';
import cheerio from 'cheerio';
import axios from 'axios';
import { getPlatformBy, getCompanyAndPositionBy } from '@/service/crawling';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { url } = await req.json();

  if (!url) return NextResponse.json({ error: 'Bad Request' }, { status: 400 });

  return fetchLinkInfo(url).then(NextResponse.json);
}

const fetchLinkInfo = async (url: string) => {
  const { data: html } = await axios.get(url);
  const platform = getPlatformBy(url);

  const $ = cheerio.load(html);
  const title =
    $('title').text() ||
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="title"]').attr('content');
  const description = $('meta[property="og:description"]').attr('content')!;

  if (!title || !platform) return;
  const { company, position } = getCompanyAndPositionBy(
    title,
    platform,
    description,
  );

  return { company, position, platform };
};
