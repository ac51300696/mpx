import { store } from './store'
import lodash from 'lodash'
export function router () {
  console.log('i am router in wx')
  console.log(lodash)
  store()
}
