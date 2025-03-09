
import React from 'react';

// News data matching the provided image
const newsData = [
  {
    title: 'Apple Announces New Product Line',
    timeAgo: '2 hours ago'
  },
  {
    title: 'Q1 Earnings Beat Expectations',
    timeAgo: '1 day ago'
  }
];

const NewsData: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-6">Latest News</h3>
      <div className="space-y-4">
        {newsData.map((news, index) => (
          <div key={index} className={index < newsData.length - 1 ? "pb-4 border-b border-gray-100" : ""}>
            <h4 className="font-medium hover:text-blue-600 cursor-pointer">{news.title}</h4>
            <p className="text-sm text-gray-500">{news.timeAgo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsData;
