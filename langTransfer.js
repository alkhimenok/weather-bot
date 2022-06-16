const { join } = require('path')
const { execSync } = require('child_process')

;(() => {
  const dist = join(__dirname, './dist/lang')
  const src = join(__dirname, './src/lang')

  execSync(`mkdir -p ${dist}`)
  execSync(`cp -r ${src}/* ${dist}`)
})()
