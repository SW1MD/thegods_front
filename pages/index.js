import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function Home() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/links');
        setLinks(response.data.data);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>My LinkTree</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">My LinkTree</h1>
        <div className="links">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.attributes.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-item"
            >
              {link.attributes.Title}
            </a>
          ))}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f0f0f0;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }
        .links {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 2rem;
        }
        .link-item {
          margin: 0.5rem;
          padding: 0.75rem 1.5rem;
          text-align: center;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          width: 100%;
          max-width: 300px;
          background-color: white;
        }
        .link-item:hover,
        .link-item:focus,
        .link-item:active {
          color: #0070f3;
          border-color: #0070f3;
        }
      `}</style>
    </div>
  );
}