// FORCE DESIGN UPDATE MARCH 2026

import { sanityClient } from '@/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';

async function getAnalyses() {
  return sanityClient.fetch(`
    *[_type == "stockAnalysis" && !(_id in path("drafts.**"))] {
      _id,
      title,
      ticker,
      companyName,
      verdict,
      "excerpt": content[0].children[0].text[0..150] + "..."
    } | order(_createdAt desc)
  `);
}

export default async function Home() {
  const analyses = await getAnalyses();

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold tracking-tighter">Deep Dive Analyses</h1>
        <p className="text-xl text-zinc-500 mt-4">Hand-crafted using my exact philosophy + Antonio’s framework</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {analyses.map((a: any) => (
          <Link href={`/analysis/${a.ticker}`} key={a._id} className="group bg-white border border-zinc-200 rounded-3xl overflow-hidden card-hover">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center">
                  <Image src={`https://logo.clearbit.com/${a.ticker.toLowerCase()}.com`} alt={a.companyName} width={56} height={56} className="object-contain" />
                </div>
                <div>
                  <div className="font-mono text-blue-600 text-sm">{a.ticker}</div>
                  <h3 className="font-semibold text-xl">{a.companyName || a.title}</h3>
                </div>
              </div>

              <div className="text-emerald-600 font-medium mb-4">{a.verdict || 'Analysis ready'}</div>
              <p className="text-zinc-600 line-clamp-3">{a.excerpt}</p>
            </div>
            <div className="border-t border-zinc-100 px-8 py-5 text-blue-600 text-sm flex items-center justify-between group-hover:bg-zinc-50">
              Read full analysis →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}