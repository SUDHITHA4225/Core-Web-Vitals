import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import _ from 'lodash';
import { onCLS, onFCP, onLCP } from 'web-vitals';
import './styles.css';

type Article = {
  id: number;
  category: string;
  title: string;
  summary: string;
  author: string;
  time: string;
  image: string;
};

const articles: Article[] = [
  { id: 1, category: 'Commerce', title: 'The quiet return of the considered purchase', summary: 'Why shoppers are trading endless choice for fewer, better decisions.', author: 'Maya Chen', time: '8 min read', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80' },
  { id: 2, category: 'Culture', title: 'A field guide to the new neighborhood store', summary: 'Independent retail is becoming a place to spend time, not just money.', author: 'Jon Bell', time: '5 min read', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80' },
  { id: 3, category: 'Technology', title: 'Small teams are building the useful internet', summary: 'The next wave of digital products feels more human by design.', author: 'Noah Williams', time: '7 min read', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80' },
  { id: 4, category: 'Design', title: 'The case for a slower interface', summary: 'A little friction can turn a transaction into a relationship.', author: 'Priya Shah', time: '6 min read', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80' },
  { id: 5, category: 'Business', title: 'The brands making room for repair', summary: 'Circular commerce is shifting from promise to practical service.', author: 'Elliot Park', time: '4 min read', image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=900&q=80' },
  { id: 6, category: 'Commerce', title: 'What a great checkout feels like', summary: 'The best conversion work is invisible, thoughtful, and quick.', author: 'Leila Morgan', time: '9 min read', image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=900&q=80' },
  { id: 7, category: 'Future', title: 'Beyond the dashboard', summary: 'Teams are rediscovering the power of a clear point of view.', author: 'Sam Rivera', time: '6 min read', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80' },
  { id: 8, category: 'Culture', title: 'The ritual of the weekly market', summary: 'Local commerce survives because it gives the week a rhythm.', author: 'Inez Cole', time: '5 min read', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80' },
  { id: 9, category: 'Technology', title: 'Designing for the pause', summary: 'Attention is not a resource to extract; it is a space to respect.', author: 'Omar Diaz', time: '8 min read', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80' },
  { id: 10, category: 'Business', title: 'A better measure of momentum', summary: 'The healthiest companies know when to stop adding more.', author: 'Ruth Adams', time: '4 min read', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80' },
  { id: 11, category: 'Design', title: 'Objects with a second life', summary: 'The most interesting products are built to keep evolving.', author: 'Tara Singh', time: '7 min read', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80' },
  { id: 12, category: 'Future', title: 'The storefront as a publishing platform', summary: 'Retail spaces are becoming living editorial calendars.', author: 'Alex Grant', time: '5 min read', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80' },
];

function initAnalytics() {
  const started = Date.now();
  while (Date.now() - started < 550) {
    // Deliberately blocks the main thread in v1.
  }
}

function SkeletonGrid() {
  return <div className="article-grid">{Array.from({ length: 6 }).map((_, index) => <div className="skeleton-card" key={index}><div className="skeleton skeleton-image" /><div className="skeleton skeleton-line short" /><div className="skeleton skeleton-line" /><div className="skeleton skeleton-line medium" /></div>)}</div>;
}

function ArticleCard({ article }: { article: Article }) {
  return <article className="article-card"><img src={article.image} alt="" /><div className="article-content"><span className="eyebrow">{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p><div className="meta"><span>{article.author}</span><span>{article.time}</span></div></div></article>;
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    initAnalytics();
    const fetchTimer = setTimeout(() => setLoaded(true), 850);
    const adTimer = setTimeout(() => setShowAd(true), 1200);
    onCLS((metric) => console.log('CLS', metric));
    onFCP((metric) => console.log('FCP', metric));
    onLCP((metric) => console.log('LCP', metric));
    return () => { clearTimeout(fetchTimer); clearTimeout(adTimer); };
  }, []);

  const sortedArticles = _.sortBy(articles, ['id']);

  return <>
    <header className="site-header"><a className="brand" href="/">SIGNAL<span>.</span></a><nav><a href="#latest">Latest</a><a href="#topics">Topics</a><a href="#about">About</a></nav><button className="subscribe">Subscribe <span>↗</span></button></header>
    <main>
      <section className="hero"><div className="hero-copy"><span className="kicker">The daily brief / 16 Sep 2026</span><h1>Ideas for a more <em>considered</em> world.</h1><p>Signal is a daily edit of the shifts shaping how we shop, work, and live.</p><a className="read-link" href="#latest">Explore the latest <span>↓</span></a></div><img className="hero-image" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=90" alt="Sunlit modern workspace" loading="lazy" /></section>
      <div className="ad-slot">{showAd && <span>Partner message <strong>Make room for what matters.</strong></span>}</div>
      <section className="feed-layout" id="latest"><div className="feed-main"><div className="section-heading"><div><span className="kicker">The edit</span><h2>Latest stories</h2></div><span className="count">{sortedArticles.length} stories</span></div>{!loaded ? <SkeletonGrid /> : <div className="article-grid">{sortedArticles.map((article) => <ArticleCard article={article} key={article.id} />)}</div>}<div className="infinite-trigger">You’re all caught up <span>✦</span></div></div><aside><div className="aside-heading"><span className="kicker">In the margin</span><span>Popular</span></div>{articles.slice(0, 6).map((article, index) => <a className="side-story" href="#latest" key={article.id}><span className="side-number">0{index + 1}</span><div><span className="eyebrow">{article.category}</span><h3>{article.title}</h3></div></a>)}</aside></section>
    </main><footer><span className="brand">SIGNAL<span>.</span></span><span>Independent perspective for curious people.</span><span>© 2026 Signal Journal</span></footer>
  </>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
