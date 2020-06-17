const SafeMath = artifacts.require("SafeMath");
const Ownable = artifacts.require("Ownable");
const Sprout = artifacts.require("Sprout");
const OwnerItem = artifacts.require("OwnerItem");
const SproutOwnership = artifacts.require("SproutOwnership");
const SproutMarket = artifacts.require("SproutMarket");
const ERC20 = artifacts.require("ERC20");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.deploy(Ownable);
  deployer.deploy(ERC20);
  deployer.link(SafeMath, [Sprout, SproutOwnership]);
  deployer.link(Ownable, Sprout);
  deployer.deploy(Sprout);
  deployer.link(ERC20, SproutOwnership);
  deployer.link(Sprout, SproutOwnership);
  deployer.deploy(SproutOwnership);
  deployer.link(SproutOwnership, OwnerItem);
  deployer.deploy(OwnerItem);
  deployer.link(OwnerItem, SproutMarket);
  deployer.deploy(SproutMarket);
};
