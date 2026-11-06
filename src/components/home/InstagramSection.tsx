'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Heart, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '../icons/InstagramIcon';

const INSTA_POSTS = [
  {
    id: 'post-1',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=85',
    caption: 'Linen in its purest, most relaxed state. Camp collar in Sand Dune. Shot in Vesu, Surat.',
    likes: 84,
    comments: 11
  },
  {
    id: 'post-2',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=700&q=85',
    caption: 'Architectural pleats and fluid movement. Our double-pleated trouser in Espresso.',
    likes: 129,
    comments: 18
  },
  {
    id: 'post-3',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=85',
    caption: 'The Waffle-Knit Resort Co-ord. Engineered for effortless balmy evenings.',
    likes: 95,
    comments: 9
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=85',
    caption: 'Layering with purpose. The herringbone chore overshirt in Tobacco Tan.',
    likes: 112,
    comments: 14
  }
];

export const InstagramSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<typeof INSTA_POSTS[0] | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E5DED4]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#E5DED4]">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#A77B55] block mb-2">
            Social Lookbook
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#242321] tracking-tight">
            FOLLOW THE STYLR EDIT
          </h2>
          <p className="text-xs text-[#77716B] mt-1 font-normal">
            Everyday outfits, styling cues, and studio behind-the-scenes.
          </p>
        </div>

        <a
          href="https://www.instagram.com/stylrmensclothing/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 sm:mt-0 inline-flex items-center space-x-2 text-xs uppercase font-semibold tracking-widest text-[#242321] hover:text-[#A77B55] transition-colors group"
        >
          <InstagramIcon className="w-4 h-4 text-[#A77B55]" />
          <span>Follow @stylrmensclothing</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* 4-Item Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {INSTA_POSTS.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group relative aspect-square bg-[#EAE5D9] overflow-hidden cursor-pointer border border-[#E5DED4]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt="STYLR Instagram Post"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Hover overlay with engagement stats */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
              <div className="flex justify-end">
                <InstagramIcon className="w-4 h-4 text-white/80" />
              </div>
              <div>
                <p className="text-[11px] text-white/90 line-clamp-2 mb-2 font-light">
                  {post.caption}
                </p>
                <div className="flex items-center space-x-3 text-xs font-semibold">
                  <span className="flex items-center space-x-1">
                    <Heart className="w-3.5 h-3.5 fill-current text-[#C49B74]" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-3.5 h-3.5 text-white/80" />
                    <span>{post.comments}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instagram Stats Card */}
      <div className="mt-8 bg-[#FAF9F6] border border-[#E5DED4] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#77716B] gap-4">
        <div className="flex items-center space-x-6 text-center sm:text-left">
          <div>
            <strong className="text-sm font-semibold text-[#242321] block">237</strong>
            <span className="text-[11px]">Posts</span>
          </div>
          <div>
            <strong className="text-sm font-semibold text-[#242321] block">355+</strong>
            <span className="text-[11px]">Followers</span>
          </div>
          <div>
            <strong className="text-sm font-semibold text-[#242321] block">Pan-India</strong>
            <span className="text-[11px]">Direct Order Support</span>
          </div>
        </div>

        <a
          href="https://www.instagram.com/stylrmensclothing/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-[#29221D] hover:bg-[#35251E] text-[#FAF9F6] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center space-x-1.5"
        >
          <span>Connect On Instagram</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
