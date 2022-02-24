import '../css/App.css';
import ArticlesContainer from './ArticlesContainer';
import { useEffect, useState } from 'react'

function App() {
  const [error, setError] = useState(false)
  const [filterError, setFilterError] = useState(false)
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
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
            image: article.multimedia ? article.multimedia[0].url : ''
					}
				}))
			} else {
				throw new Error('Failed to fetch.')
			}
		} catch (err) {
      console.log(err)
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
    const filteredArticles = articles.filter(article => {
      return article.section === dropdown
    })
    if (!filteredArticles.length) {
      setFilterError(true)
    } else {
      setFilterError(false)
      setFilteredArticles(filteredArticles)
    }
  }

  const reset = () => {
    setFilteredArticles([])
    setFilterError(false)
  }
  

  return (
    <main className="App">
      <h1>Top NYT Articles Today</h1>
      <div className='filter'>
        <select value={dropdown}
        onChange={event => setDropdown(event.target.value)}>{displayCategoryDropdowns}</select>
        <button onClick={(event => handleFilter(event))}>Filter</button>
        <button onClick={(() => reset())}>Reset</button>
      </div>
      {!filterError ? <>
        {!filteredArticles.length ? <ArticlesContainer articles={articles}/> : <ArticlesContainer articles={filteredArticles}/>}
      </> : <p>Oops, looks like today there are no articles in that category!</p>}
    </main>
  );
}

export default App;
