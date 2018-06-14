import test from 'ava'
import esmPkg from '../lib'

test(t => {
  t.deepEqual(esmPkg(__dirname, {
    moduleFields: ['main']
  }), [])
})
