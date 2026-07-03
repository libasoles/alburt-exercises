/**
 * Pure function: given the current move-tree node and a SAN string,
 * return the rating, optional book response, and next node (or null = free play).
 *
 * @param {object|null} treeNode - current node (keyed by SAN)
 * @param {string} san - the move just played
 * @returns {{ rating: 'best'|'ok'|'bad', response: string|null, nextNode: object|null }}
 */
export function evaluateMove(treeNode, san) {
  if (!treeNode || !(san in treeNode)) {
    return { rating: 'bad', response: null, nextNode: null }
  }

  const node = treeNode[san]
  const response = node.response ?? null

  if (node.rating === 'best') {
    return {
      rating: 'best',
      response,
      nextNode: node.continuations ?? null,
    }
  }

  // 'ok' or 'bad': response may still play (e.g. Ex6 Nc4 → Qg7+), but tree ends
  return {
    rating: node.rating,
    response,
    nextNode: null,
  }
}
