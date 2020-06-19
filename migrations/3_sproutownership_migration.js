const SproutOwnership = artifacts.require("SproutOwnership");
const Sprout = artifacts.require("Sprout");

module.exports = function(deployer) {
  deployer.deploy(SproutOwnership);
  deployer.link(SproutOwnership, Sprout);
};
