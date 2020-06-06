const token= artifacts.require("SproutOwnership");

module.exports = function(deployer) {
  deployer.deploy(token);
};
