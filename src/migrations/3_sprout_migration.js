const Sprout = artifacts.require("Sprout");
const SafeMath = artifacts.require("SafeMath");
const Ownable = artifacts.require("Ownable");
module.exports = function(deployer) {
	deployer.deploy(SafeMath);
	deployer.deploy(Ownable);
  deployer.deploy(Sprout);
};