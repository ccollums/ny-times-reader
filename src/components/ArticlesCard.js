import DetailsModal from "./DetailsModal"
import '../css/ArticlesCard.css'

const ArticlesCard = ({id, section, subsection, title, abstract, url, byline, image }) => {
	return (
		<section className='article-card'>
			<p>{title}</p>
			<p>{byline}</p>
		</section>
	)
}

export default ArticlesCard