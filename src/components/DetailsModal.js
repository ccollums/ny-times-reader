import '../css/DetailsModal.css'
import { IoIosCloseCircle } from 'react-icons/io';

const DetailsModal = ({closeModal, section, subsection, title, abstract, url, byline, image}) => {
	return (
		<section className='details-modal'>
			<img src={image} alt={title}/>
			<p>{title}</p>
			<p>{byline}</p>
			<p>{abstract}</p>
			<a href={url}>Visit Article Here</a> 
			<p>{section}</p>
			<p>{subsection}</p>
			<IoIosCloseCircle onClick={closeModal}/>
		</section>
	)
}

export default DetailsModal