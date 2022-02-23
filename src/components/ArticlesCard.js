import DetailsModal from "./DetailsModal"
import '../css/ArticlesCard.css'
import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ArticlesCard = ({id, section, subsection, title, abstract, url, byline, image }) => {
	const [modalOpen, setModalOpen] = useState(false)

  const openModal = (event) => {
		console.log('hi')
    event.preventDefault()
    setModalOpen(true)
  }

  const closeModal = (event) => {
    event.preventDefault()
    setModalOpen(false)
  }
	
	return (
		<section className='article-card'>
			<p onClick={(event) => openModal(event)}>{title}</p>
			<p>{byline}</p>
			<Modal 
        className='Modal'
        overlayClassName="Overlay"
        isOpen={modalOpen}
        contentLabel="Article Modal">
        <DetailsModal closeModal={closeModal} section={section} subsection={subsection} title={title} abstract={abstract} url={url} byline={byline} image={image} />
      </Modal>
		</section>
	)
}

export default ArticlesCard