
import React from 'react';

// Enhanced news data
const newsData = [
  {
    title: 'Apple Announces New Product Line',
    timeAgo: '2 hours ago',
    content: 'Apple unveiled its latest lineup of products, including updates to the iPhone, iPad, and MacBook series.'
  },
  {
    title: 'Q1 Earnings Beat Expectations',
    timeAgo: '1 day ago',
    content: 'Apple reported Q1 earnings of $1.52 per share, beating analysts\' expectations of $1.43 per share.'
  },
  {
    title: 'Apple Partners with AI Startup for New Features',
    timeAgo: '3 days ago',
    content: 'The tech giant announced a new partnership with an AI startup to enhance Siri and other AI features across its ecosystem.'
  },
  {
    title: 'Analysts Upgrade Stock to Buy Rating',
    timeAgo: '1 week ago',
    content: 'Several major analysts have upgraded Apple stock to a "Buy" rating, citing strong product demand and services growth.'
  }
];

const NewsData: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Latest News</h3>
      <div className="space-y-4">
        {newsData.map((news, index) => (
          <div key={index} className={index < newsData.length - 1 ? "pb-4 border-b border-border" : ""}>
            <h4 className="font-medium hover:text-primary cursor-pointer">{news.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{news.timeAgo}</p>
            <p className="text-sm text-muted-foreground">{news.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsData;
