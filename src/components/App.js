import '../css/App.css';
import ArticlesContainer from './ArticlesContainer';
import { useEffect, useState } from 'react'

function App() {
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState([])

  const fetchData = async () => {
		try {
			const articleData = await fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=3nLzi0V3opGoomfs9zbdshAOmTpVS71D')
			if (articleData.ok) {
				const { results } = await articleData.json()
				setArticles(results.map((article, index) => {
					return {
						id: index + 1,
						section: article.section,
            subsection: article.subsection,
            title: article.title,
            abstract: article.abstract,
            url: article.url,
            byline: article.byline,
            image: article.multimedia[0].url
					}
				}))
			} else {
				throw new Error('Failed to fetch.')
			}
		} catch (err) {
			setError(true)
		}
	}

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="App">
      <h1>Top NYT Articles Today</h1>
      <ArticlesContainer articles={articles}/>
    </main>
  );
}

export default App;