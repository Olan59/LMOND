import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, User, Calendar, ArrowRight, ArrowLeft, Heart, Share2, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface BlogViewProps {
  articles: Article[];
  selectedArticleFromParent?: Article | null;
  onBackToCatalog?: () => void;
}

export default function BlogView({
  articles,
  selectedArticleFromParent,
  onBackToCatalog
}: BlogViewProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(selectedArticleFromParent || null);

  const handleShare = (title: string) => {
    alert(`Bespoke link to "${title}" successfully copied. Share botanical awareness with your community!`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-left bg-stone-50 text-stone-900 font-sans">
      
      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          /* SECTION 1: Articles Grid Listing */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Editorial Header */}
            <div className="border-b border-stone-200 pb-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">CULTURE & RESEARCH</span>
              <h1 className="text-4xl font-light tracking-tight text-stone-900 font-sans mt-1">Scientific Editorial</h1>
              <p className="text-sm text-stone-500 mt-2 font-sans font-light max-w-2xl leading-relaxed">
                Biomedical studies, formulation breakthroughs, and lifestyle protocols compiled by our in-house dermatologists and chemical scientists.
              </p>
            </div>

            {/* Articles Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="flex flex-col overflow-hidden rounded-3xl border border-stone-200/60 bg-white shadow-sm hover:shadow-md transition-all group cursor-pointer"
                  onClick={() => {
                    setSelectedArticle(article);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="aspect-video overflow-hidden bg-stone-100 relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-550"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 bg-stone-950/90 text-amber-400 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[10px] text-stone-400 font-medium">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {article.author}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {article.date}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs text-stone-500 font-light line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-amber-800 font-semibold group-hover:text-stone-900 transition-colors">
                      <span className="uppercase tracking-widest text-[10px]">Read Treatise</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        ) : (
          /* SECTION 2: Article Deep-Dive Treatise View */
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto space-y-8 py-4"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to editorials</span>
            </button>

            {/* Banner Meta */}
            <div className="space-y-4">
              <span className="rounded-full bg-amber-50 border border-amber-500/20 text-amber-800 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                {selectedArticle.category}
              </span>

              <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-stone-900 font-sans leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-stone-200/60 py-4 text-xs text-stone-500 font-light">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                    <User className="h-4 w-4 text-stone-400" />
                    {selectedArticle.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-stone-400" />
                    {selectedArticle.date}
                  </span>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => handleShare(selectedArticle.title)}
                    className="flex items-center gap-1 border border-stone-200 hover:bg-stone-100 p-2 rounded-full cursor-pointer transition-colors"
                    title="Share Article"
                  >
                    <Share2 className="h-3.5 w-3.5 text-stone-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Image */}
            <div className="aspect-video w-full overflow-hidden rounded-3xl shadow-md">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Scientific Essay Text */}
            <div className="prose prose-stone max-w-none text-sm sm:text-base leading-relaxed text-stone-600 font-sans font-light whitespace-pre-line border-b border-stone-200 pb-10">
              {selectedArticle.content}
            </div>

            {/* Article Tags and Footer */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mr-2">Classification tags:</span>
              {selectedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-stone-100 px-3 py-1 text-xs text-stone-600 font-medium border border-stone-200/50"
                >
                  #{tag}
                </span>
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
