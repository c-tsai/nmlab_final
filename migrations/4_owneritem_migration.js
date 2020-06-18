const OwnerItem = artifacts.require("OwnerItem");
module.exports = function(deployer) {
  deployer.deploy(OwnerItem);
};
