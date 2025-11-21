import { videos } from '@/data/videos';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArrowLeft, Clock, BarChart, Calendar } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return videos.map((video) => ({
        slug: video.id,
    }));
}

export default function VideoPage({ params }: { params: { slug: string } }) {
    const video = videos.find((v) => v.id === params.slug);

    if (!video) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-navy-900 text-white">
            <Header />

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
                <Link href="/academy" className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors mb-8">
                    <ArrowLeft size={20} />
                    Retour à l'Académie
                </Link>

                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 mb-8">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gold-500" />
                        {video.duration}
                    </div>
                    <div className="flex items-center gap-2">
                        <BarChart size={16} className="text-gold-500" />
                        <span className="capitalize">{video.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gold-500" />
                        {video.publishDate}
                    </div>
                </div>

                <h1 className="font-serif text-3xl md:text-5xl mb-6 text-white">{video.title}</h1>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                    <p className="leading-relaxed">{video.description}</p>
                </div>

                <div className="mt-8 flex gap-2">
                    {video.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gold-500 border border-white/10">
                            #{tag}
                        </span>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
