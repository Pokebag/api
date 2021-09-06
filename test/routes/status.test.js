/* eslint-disable @babel/no-unused-expressions */
// Module imports
import chai from 'chai'





// Local imports
import httpStatus from '../../src/helpers/httpStatus.js'
import API from '../../src/structures/API.js'





// Constants
const BASE_URL = '/status'





describe(BASE_URL, () => {
	let requester = null

	beforeEach(() => {
		requester = chai.request(API.callback()).keepOpen()
	})

	afterEach(() => {
		requester.close()
	})

	it('should complete successfully', async () => {
		const RESPONSE = await requester.get(BASE_URL)

		chai.expect(RESPONSE).to.have.status(httpStatus.OK)
			.and.to.be.json
	})
})
