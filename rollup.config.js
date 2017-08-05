import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/vue-form-validator.js',
  format: 'umd',
  moduleName: 'vueFormValidator',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ],
  dest: 'dist/vue-form-validator.js'
}