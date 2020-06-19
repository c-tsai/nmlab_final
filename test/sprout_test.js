const Sprout = artifacts.require("Sprout");


contract("Sprout", accounts => {
    it("Testing registration", () => {
    let contract;
    return Sprout.deployed()
        .then(instance => {
            contract = instance;
            return contract.Register("0xB32E9D690017A05Eb250b60AAdC6a0E8FCEDD67f");
        })
        .then(() => {
            return contract.balanceOf.call("0xB32E9D690017A05Eb250b60AAdC6a0E8FCEDD67f")
        })
        .then(balance => {
            assert.equal(balance.valueOf(), 1000 , 'account 0 balance is wrong');
        })
    });
    it("Testing get feature", () => {
        let contract;
        return Sprout.deployed()
            .then(instance => {
                contract = instance;
                return contract.Register("0xB32E9D690017A05Eb250b60AAdC6a0E8FCEDD67f");
            })
            .then(() => contract.randomAddSprout(0,0))
            .then(() => {
                return contract.balanceOf.call("0xB32E9D690017A05Eb250b60AAdC6a0E8FCEDD67f");
            })
            .then(balance => {
                assert.equal(balance.valueOf(), 700 , 'account 0 balance is wrong');})
            .then(() => {return contract.getSeedRound.call(0,0);})
            .then(balance => {
                assert.equal(balance.valueOf(), 1 , 'seed should be wrinkled');})
            .then(() => {return contract.getSeedYellow.call(0,0);})
            .then(balance => {
                assert.equal(balance.valueOf(), 1 , 'seed should be green');
            })
            .then(() => {return contract.getColor.call(0,0);})
            .then(balance => {
                assert.equal(balance.valueOf(), 2 , 'color should be pale');
            })
            
    });
});
