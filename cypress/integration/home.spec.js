describe('home page', () => {
	beforeEach(() => {
		cy.fixture('./articles.json').then((allArticles) => {
			cy.intercept('GET', 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=3nLzi0V3opGoomfs9zbdshAOmTpVS71D', {
				statusCode: 200,
				body: allArticles
			})
			cy.visit('http://localhost:3000/');
		})
	})
	
	it('should visit the home page on load and show articles and filter', () => {
		cy.get(':nth-child(1) > .article').contains('Maps:')
		cy.get(':nth-child(2) > .article').contains('Putin')
		cy.get(':nth-child(3) > .article').contains('The Invasion')
		cy.get('select').should('be.visible')
		cy.get('.filter > :nth-child(2)').should('be.visible')
		cy.get('.filter > :nth-child(3)').should('be.visible')
	})

	it('should be able to filter the articles by category', () => {
		cy.get('select').select('politics')
		cy.get('.filter > :nth-child(2)').click()
		cy.get('.article-container').contains('Maps')
	})

	it('should be able to clear the filter', () => {
		cy.get('select').select('politics')
		cy.get('.filter > :nth-child(2)').click()
		cy.get('.article-container').contains('Maps')
		cy.get('.filter > :nth-child(3)').click()
		cy.get(':nth-child(2) > .article').should('be.visible')
		cy.get(':nth-child(3) > .article').should('be.visible')
	})

	it('should be able to click an article to show further details', () => {
		cy.get(':nth-child(1) > .article').click()
		cy.get('.ReactModal__Content').should('be.visible')
		cy.get('img').should('be.visible')
		cy.get('.details-modal > strong').should('be.visible')
		cy.get('.abstract').should('be.visible')
		cy.get('a').should('be.visible')
	})

	it('should be able to exit out of details page and see articles again', () => {
		cy.get(':nth-child(1) > .article').click()
		cy.get('.x-icon').click()
		cy.get(':nth-child(1) > .article').should('be.visible')
	})
})