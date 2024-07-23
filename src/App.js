import React, { useState, useEffect } from 'react';
import CMSLayout from './components/CMSLayout';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const formattedPosts = data.map(post => ({
          id: post.id,
          banner: post.properties.Banner?.files[0]?.file?.url || '',
          name: post.properties.NameDiego?.title[0]?.plain_text || 'Untitled',
          summary: post.properties.ResumenDiego?.rich_text[0]?.plain_text || 'No summary',
          tags: post.properties.TagsDiego?.multi_select.map(tag => tag.name) || []
        }));
        setPosts(formattedPosts);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <CMSLayout>
      <h1 className="text-2xl font-bold mb-4">Notion Data</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {post.banner && (
                <img 
                  src={post.banner} 
                  alt={post.name} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="font-bold text-xl mb-2">{post.name}</h2>
                <p className="text-gray-700 text-base mb-4">{post.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-blue-200 text-blue-800 py-1 px-3 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CMSLayout>
  );
}

export default App;