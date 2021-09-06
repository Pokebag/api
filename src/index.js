#!/usr/bin/env node

import dotenv from 'dotenv'
dotenv.config()





// Local imports
import API from './structures/API.js'





// Local constants
const {
	PORT = 3001,
} = process.env





API.listen(PORT)
console.log(`Server started; listening on port ${PORT}...`)
