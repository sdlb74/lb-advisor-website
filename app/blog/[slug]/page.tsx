import { posts } from '@/data/posts';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return posts.map((post) => ({
        slug: post.id,
    }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = posts.find((p) => p.id === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-navy-900 text-white">
            <Header />

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
                <Link href="/blog" className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors mb-8">
                    <ArrowLeft size={20} />
                    Retour au Blog
                </Link>

                <div className="w-full aspect-[21/9] rounded-xl overflow-hidden mb-8">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-8">
                    <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
                        {post.category}
                    </span>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {post.readTime} min de lecture
                    </div>
                    <div className="flex items-center gap-2">
                        <User size={16} />
                        {post.author}
                    </div>
                </div>

                <h1 className="font-serif text-4xl md:text-6xl mb-8 text-white leading-tight">{post.title}</h1>

                <div
                    className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-gold-500 prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </main>

            <Footer />
        </div>
    );
}
