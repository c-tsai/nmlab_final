const Sprout = artifacts.require("Sprout");


contract("Sprout", accounts => {
  it("Owner testing", () => 
    Sprout.deployed()
        //.then(register => register.Register("0x1c9576b3c7F3D5577d1Ff71212B2b45862e1BBd9"))
        //.then(instance => instance.plugSprout(0,0))
        //.then(res => SproutOwnership(res).balanceOf.call("0x1c9576b3c7F3D5577d1Ff71212B2b45862e1BBd9"))
        .then(instance => instance.balanceOf("0x1c9576b3c7F3D5577d1Ff71212B2b45862e1BBd9"))
        .then(balance => {
        assert.equal(balance.valueOf(), 0, 'account 0 balance is wrong');
    }));
});
/*  it("should assert ", function() {
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
//});
