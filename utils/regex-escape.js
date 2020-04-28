// Regex function for search functionality
const escapeRegex = string => {
  return string.replace('(?i)G[a-b](?-i).*')
}
// Exporting Function
module.exports = escapeRegex
