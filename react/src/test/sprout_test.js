const S = artifacts.require("Sprout");
const truffleAssert = require('truffle-assertions');

contract("Sprout", function() {
  it("PlugSprout testing", function() {
    var token;
    return S.deployed().then(async function(instance){
        token = instance;
        let tx = await token.randomAddSprout(2,1);
        truffleAssert.eventEmitted(tx, 'OnAdd');
    }).then(function(result){
        return token.plugSprout(2,1);
    }).then(function(result){
        return token.getBalance();
    }).then(function(result){
        assert.equal(result.toNumber(), 250, 'account 0 balance is wrong');
    });
  });
  
  /*it("should assert ", function() {
    var token;
    return S.deployed().then(function(instance){
        token = instance;
        return token.balanceOf.call("0x49c0C80f271F67A8d77f2b4b21dbB8A8FAFDc9b3");
    }).then(function(result){
        assert.equal(result.toNumber(), 10000, 'account 0 balance is wrong');
    });
  });
  /*it("should assert transfer", function() {
    var token;
    return Nmlabtoken.deployed().then(function(instance){
        token = instance;
        return token.transfer("0xaC7390eA92d452C11F369C8D37D215060F48510f", 100);
    }).then(function(result){
        return token.balanceOf.call("0xaC7390eA92d452C11F369C8D37D215060F48510f");
    }).then(function(result){
        assert.equal(result.toNumber(), 100, 'account 0 balance is wrong');
    }).then(function(result){
        return token.balanceOf.call("0x49c0C80f271F67A8d77f2b4b21dbB8A8FAFDc9b3");
    }).then(function(result){
        assert.equal(result.toNumber(), 9900, 'account 0 balance is wrong');
    });
  });
  it("should assert allowance", function() {
    var token;
    return Nmlabtoken.deployed().then(function(instance){
        token = instance;
        return token.allowance.call("0x49c0C80f271F67A8d77f2b4b21dbB8A8FAFDc9b3", "0xaC7390eA92d452C11F369C8D37D215060F48510f");
    }).then(function(result){
        assert.equal(result.toNumber(), 0, 'allowance is wrong');
    });
  });
  it("should assert approve", function() {
    var token;
    return Nmlabtoken.deployed().then(function(instance){
        token = instance;
        return token.approve("0xaC7390eA92d452C11F369C8D37D215060F48510f", 100);
    }).then(function(result){
        return token.allowance.call("0x49c0C80f271F67A8d77f2b4b21dbB8A8FAFDc9b3","0xaC7390eA92d452C11F369C8D37D215060F48510f");
    }).then(function(result){
        assert.equal(result.toNumber(), 100, 'acount1 allowance is wrong');
    })
  });
  it("should assert approve", function() {
    var token;
    return Nmlabtoken.deployed().then(function(instance){
        token = instance;
        return token.approve.call("0xaC7390eA92d452C11F369C8D37D215060F48510f", 100, {from:"0x49c0C80f271F67A8d77f2b4b21dbB8A8FAFDc9b3" });
    }).then(function(result){
        return token.allowance.call("0x49c0C80f271F67A8d77f2b4b21dbB8A8FAFDc9b3","0xaC7390eA92d452C11F369C8D37D215060F48510f");
    }).then(function(result){
        assert.equal(result.toNumber(), 100, 'acount1 allowance is wrong');
    }).then(function(result){
        return token.transferFrom.call("0x49c0C80f271F67A8d77f2b4b21dbB8A8FAFDc9b3","0xaC7390eA92d452C11F369C8D37D215060F48510f", 100, {from :"0xaC7390eA92d452C11F369C8D37D215060F48510f"});
    }).then(function(result){
        return token.balanceOf.call("0xaC7390eA92d452C11F369C8D37D215060F48510f");
    }).then(function(result){
        assert.equal(result.toNumber(), 100, 'account 2 balance is wrong');
    }).then(function(result){
        return token.balanceOf.call("0x49c0C80f271F67A8d77f2b4b21dbB8A8FAFDc9b3");
    }).then(function(result){
        assert.equal(result.toNumber(), 9900, 'account 0 balance is wrong');
    });
  });*/
});