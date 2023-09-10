// here are all the stupid solutions done by me, because I didn't find a better one.

// export class StupidSolution {
// }

/**
 * Remove all the v-list-item--active class from all v-list-item
 * This is done becouse when you use router.push and push to specific route
 * the previous v-list-item will still active and the one of the current route also.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
export const removeVItemActiveClass = (item) => {
  if (!item) return
  item.classList.remove('v-list-item--active')
  item.classList.remove('bg-primary')
  item.classList.remove('bg-yellow-darken-4')
  item.classList.remove('bg-blue')
}
