import { sanityClient } from '@/lib/sanity';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

async function getAnalysis(ticker: string) {
  return sanityClient.fetch(`
    *[_type == "stockAnalysis" && ticker == $ticker][0] {
      title,
      ticker,
      content
    }
  `, { ticker });
}

export default async function AnalysisPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;   // ← This is the exact Next.js 16 fix

  const post = await getAnalysis(ticker);

  if (!post) {
    return <div className="p-12 text-center text-xl">Analysis not found</div>;
  }

  const markdown = post.content
    ?.flatMap((block: any) => 
      block.children?.map((child: any) => child.text || '') || []
    )
    .join('\n\n') || '';

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">← Back to all analyses</Link>
        
        <div className="mb-10">
          <span className="font-mono text-blue-400 text-2xl">{post.ticker}</span>
          <h1 className="text-5xl font-bold mt-2 leading-tight">{post.title}</h1>
        </div>

        <article className="prose prose-invert max-w-none text-lg leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}