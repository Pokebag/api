// Module imports
import { promises as fs } from 'fs'
import path from 'path'





export async function getVersion() {
	const packagePath = path.resolve(process.cwd(), 'package.json')
	const packageData = await fs.readFile(packagePath, 'utf8')
	const packageJSON = JSON.parse(packageData)
	return packageJSON.version
}
