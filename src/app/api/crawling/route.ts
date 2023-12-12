import { NextRequest, NextResponse } from 'next/server';
import cheerio from 'cheerio';
import axios from 'axios';
import { getPlatformBy, getTitle } from '@/service/crawling';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) return new Response('Bad Request', { status: 400 });

  return crawlingLink(url).then(NextResponse.json);
}

const crawlingLink = async (url: string) => {
  const { data: html } = await axios.get(url);
  const platform = getPlatformBy(url);

  const $ = cheerio.load(html);
  const titleContent =
    $('meta[property="og:title"]').attr('content') ||
    $('title').text() ||
    $('meta[name="title"]').attr('content');
  const description = $('meta[name="description"]').attr('content');

  if (!titleContent || !platform || !description) return;
  const title = getTitle(titleContent, platform, description);

  return { title, platform, description };
};
