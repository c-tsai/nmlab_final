const OwnerItem = artifacts.require("OwnerItem");
const SproutOwnership = artifacts.require("SproutOwnership");

module.exports = function(deployer) {
  deployer.deploy(OwnerItem);
  deployer.link(OwnerItem, SproutOwnership);
};
