// Replaces the bundled trust lists with the latest from their remote sources.
// Every source with a `url` and a `trustlists/<key>/index.ts` file is updated,
// using the same sources and fetch logic as the client.
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { runnerImport } from 'vite'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const options = { root, configFile: false, logLevel: 'silent' }
const { module: { TRUST_LIST_SOURCES } } = await runnerImport(resolve(root, 'constants/trust.ts'), options)
const { module: { fetchTrustListContents } } = await runnerImport(resolve(root, 'helpers/trust.ts'), options)

for(const [key, { url, type }] of Object.entries(TRUST_LIST_SOURCES)) {
	const indexPath = resolve(root, 'trustlists', key, 'index.ts')
	if(!url || !existsSync(indexPath)) continue
	try {
		const contents = await fetchTrustListContents(url, type)
		if(!contents) throw new Error('no certificates or OIDs found')
		// Keep the existing export name
		const [, name] = (await readFile(indexPath, 'utf8')).match(/export const (\w+)/) ?? []
		if(!name) throw new Error(`no export found in ${indexPath}`)
		await writeFile(resolve(root, 'trustlists', key, basename(new URL(url).pathname)), `${contents}\n`)
		await writeFile(indexPath, `export const ${name}: string = \`${contents}\n\`;\n\nexport default ${name};\n`)
		const count = contents.match(/BEGIN CERTIFICATE/g)?.length ?? contents.split('\n').filter(line => !line.startsWith('//')).length
		console.log(`Updated ${key}: ${count} entries from ${url}`)
	} catch(error) {
		// Keep the existing bundled copy so builds still work offline
		console.warn(`Kept bundled ${key}: ${error.message}`)
	}
}
