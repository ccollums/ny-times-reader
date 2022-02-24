import '../css/App.css';
import ArticlesContainer from './ArticlesContainer';
import { useEffect, useState } from 'react'

function App() {
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState([])
  const [dropdown, setDropdown] = useState('')
  const categories = ['arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world']

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

  const displayCategoryDropdowns = categories.map(category => {
    return <option>{category}</option>
  })

  const handleFilter = (event) => {
    event.preventDefault()
    console.log(dropdown)
  }

  return (
    <main className="App">
      <h1>Top NYT Articles Today</h1>
      <div className='filter'>
        <select value={dropdown}
        onChange={event => setDropdown(event.target.value)}>{displayCategoryDropdowns}</select>
        <button onClick={(event => handleFilter(event))}>Filter</button>
      </div>
      <ArticlesContainer articles={articles}/>
    </main>
  );
}

export default App;
