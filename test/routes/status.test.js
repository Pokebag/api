/* eslint-disable @babel/no-unused-expressions */
// Module imports
import chai from 'chai'
import { Validator } from 'jsonapi-validator'





// Local imports
import httpStatus from '../../src/helpers/httpStatus.js'
import API from '../../src/structures/API.js'





// Constants
const BASE_URL = '/status'





describe(BASE_URL, () => {
	let requester = null
	let validator = null

	beforeEach(() => {
		requester = chai.request(API.callback()).keepOpen()
		validator = new Validator
	})

	afterEach(() => {
		requester.close()
	})

	it('should respond successfully', async () => {
		const RESPONSE = await requester.get(BASE_URL)

		chai.expect(RESPONSE).to.have.status(httpStatus.OK)
			.and.to.be.json
	})

	it('should generate a JSON:API compliant body', async () => {
		const { body } = await requester.get(BASE_URL)

		chai.expect(validator.isValid(body)).to.be.true
	})
})
