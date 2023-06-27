import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = '636bbec8f0684a2e9594fa5deb17a7f8'; // Replace with your actual API key from newsapi.org

export default function NewsWidget() {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        setHeadlines(response.data.articles.slice(0, 3).map((article) => article.title));
      } catch (error) {
        console.log(error);
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <div>
      <h2>News Headlines</h2>
      {headlines.length > 0 ? (
        <ul>
          {headlines.map((headline, index) => (
            <li key={index}>{headline}</li>
          ))}
        </ul>
      ) : (
        <p>Loading headlines...</p>
      )}
    </div>
  );
}

