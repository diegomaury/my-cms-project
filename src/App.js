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
          name: post.properties.Name.title[0]?.plain_text || 'Untitled', // Revisa que el nombre de la propiedad sea correcto
          description: post.properties.Resumen.rich_text[0]?.plain_text || 'No description', // Revisa que el nombre de la propiedad sea correcto
          tags: post.properties.Tags.multi_select.map(tag => tag.name) // Revisa que el nombre de la propiedad sea correcto
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
      <h1 className="text-2xl font-bold mb-4">Welcome to the CMS</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{post.name}</h2>
              <p className="mt-2">{post.description}</p>
              <div className="mt-4">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </CMSLayout>
  );
}

export default App;
