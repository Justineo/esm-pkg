import { join } from 'path'
import { existsSync } from 'fs'
import pkgDir from 'pkg-dir'

const LOCK_FILES = ['package-lock.json', 'npm-shrinkwrap.json']

function getLockData (cwd) {
  let dir = pkgDir.sync(cwd)
  if (!dir) {
    return null
  }

  let lockFile = LOCK_FILES
    .map(file => join(dir, file))
    .find(file => existsSync(file))

  if (!lockFile) {
    return null
  }

  return require(lockFile)
}

const DEFAULT_OPTIONS = {
  moduleFields: ['module', 'jsnext:main']
}

export default function (cwd, options = {}) {
  let lock = getLockData(cwd)
  if (!lock) {
    return []
  }

  let finalOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  }
  return Object.keys(lock.dependencies || {}).reduce((acc, name) => {
    let pkg = require(`${name}/package.json`)
    let mod = (finalOptions.moduleFields || []).find(file => !!pkg[file])
    if (mod) {
      acc.push(name)
    }
    return acc
  }, [])
}
