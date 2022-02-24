import '../css/DetailsModal.css'
import { IoIosCloseCircle } from 'react-icons/io';

const DetailsModal = ({closeModal, section, subsection, title, abstract, url, byline, image}) => {
	return (
		<section className='details-modal'>
			<img src={image} alt={title}/>
			<strong>{title}</strong>
			<p>{byline}</p>
			<p className='abstract'>{abstract}</p>
			<a href={url}>View Article Here</a> 
			<div className='sections'>
				<p>{section}</p>
				<p>{subsection}</p>
			</div>
			<IoIosCloseCircle className='x-icon' onClick={(event) => closeModal(event)}/>
		</section>
	)
}

export default DetailsModal