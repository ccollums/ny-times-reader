import '../css/DetailsModal.css'


const DetailsModal = ({closeModal, section, subsection, title, abstract, url, byline, image}) => {
	console.log('modal')
	return (
		<section className='details-modal'>
			<p>{title}</p>
		</section>
	)
}

export default DetailsModal