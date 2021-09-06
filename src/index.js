#!/usr/bin/env node

import dotenv from 'dotenv'

dotenv.config()





// Local imports
import API from './structures/API.js' // eslint-disable-line import/first





// Local constants
const {
	PORT = 3001,
} = process.env





API.listen(PORT)

// eslint-disable-next-line no-console
console.log(`Server started; listening on port ${PORT}...`)
