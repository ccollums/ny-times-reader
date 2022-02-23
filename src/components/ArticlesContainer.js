import ArticlesCard from "./ArticlesCard"
import '../css/ArticlesContainer.css'

const ArticlesContainer = ({ articles }) => {

	const displayArticles = articles.map(article => {
		return <ArticlesCard 
			id={article.id}
			key={article.id}
			section={article.section}
			subsection={article.subsection}
			title={article.title}
			abstract={article.abstract}
			url={article.url}
			byline={article.byline}
			image={article.image}
		/>
	})
	return (
		<section className='article-container'>
			{displayArticles}
		</section>
	)
}

export default ArticlesContainer