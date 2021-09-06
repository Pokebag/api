// Module imports
import chai from 'chai'





// Local imports
import API from '../../../../src/structures/API.js'





// Constants
const BASE_URL = '/status'





describe(BASE_URL, function () {
	let requester = null

	beforeEach(() => {
		requester = chai.request(API.callback()).keepOpen()
	})

	afterEach(() => {
		requester.close()
	})

	it('should complete successfully', async () => {
		const RESPONSE = await requester.get(`${BASE_URL}/crustle`)

		chai.expect(RESPONSE).to.have.status(200)
			.and.to.be.json
	})
})
