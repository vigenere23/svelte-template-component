import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import sizes from 'rollup-plugin-sizes'
import pkg from './package.json'
import autoPreprocess from 'svelte-preprocess'
import typescript from '@wessberg/rollup-plugin-ts'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import del from 'rollup-plugin-delete'
import execute from 'rollup-plugin-execute'

const production = !process.env.ROLLUP_WATCH

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase())

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.module, format: 'es' },
    { file: pkg.main, format: 'umd', name }
  ],
  plugins: [
    // Ensures removed files are removed from compiled files
    del({ targets: ['dist/*', 'lib/*'] }),
    svelte({
      preprocess: autoPreprocess({
        postcss: {
          plugins: [require('autoprefixer')]
        }
      })
    }),
    typescript({ sourceMap: !production }),
    // Remove if you don't use node utilities (like fs, path, etc.)
    nodePolyfills(),
    resolve(),
    // Builds the external .ts files
    execute('tsc -p src/lib'),
    // Creates an index.d.ts for svelte components
    execute(`echo "export * from '../src/components'" > dist/index.d.ts`),
    // Shows compiled bundles sizes (not for /lib)
    sizes()
  ]
}
