/* eslint-disable @babel/no-unused-expressions */
// Module imports
import chai from 'chai'
import { Validator } from 'jsonapi-validator'





// Local imports
import httpStatus from '../../../../src/helpers/httpStatus.js'
import API from '../../../../src/structures/API.js'





// Constants
const BASE_URL = '/unite/pokemon/:pokemonID'





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

	it('runs successfully', async () => {
		const RESPONSE = await requester.get(BASE_URL.replace(':pokemonID', 'crustle'))

		chai.expect(RESPONSE).to.have.status(httpStatus.OK)
			.and.to.be.json
	})

	it('returns a JSON:API compliant body', async () => {
		const { body } = await requester.get(BASE_URL.replace(':pokemonID', 'crustle'))

		chai.expect(validator.isValid(body)).to.be.true
	})

	it('includes skills', async () => {
		const { body } = await requester.get(`${BASE_URL.replace(':pokemonID', 'crustle')}?include=skills`)

		chai.expect(body.included).to.be.an('array')
		body.included.forEach(item => {
			chai.expect(item.type).to.equal('skill')
		})
	})
})
