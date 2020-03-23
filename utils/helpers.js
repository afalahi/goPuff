function findFactors(payload,factorType) {
  return payload._embedded.factors.find(i => i.factorType === factorType)._links.verify.href;
}



module.exports = {
  findFactors
}