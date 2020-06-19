const Sprout = artifacts.require("Sprout");


contract("Sprout", accounts => {
    it("Testing registration", () => {
    let contract;
    return Sprout.deployed()
        .then(instance => {
            contract = instance;
            return contract.Register("0x1c9576b3c7F3D5577d1Ff71212B2b45862e1BBd9");
        })
        .then(() => {
            return contract.balanceOf.call("0x1c9576b3c7F3D5577d1Ff71212B2b45862e1BBd9")
        })
        .then(balance => {
            assert.equal(balance.valueOf(), 1000 , 'account 0 balance is wrong');
        })
    });
    it("Testing randomAdd", () => {
        let contract;
        return Sprout.deployed()
            .then(instance => {
                contract = instance;
                return contract.Register("0x1c9576b3c7F3D5577d1Ff71212B2b45862e1BBd9");
            })
            .then(() => contract.randomAddSprout(0,0))
            .then(() => {
                return contract.balanceOf.call("0x1c9576b3c7F3D5577d1Ff71212B2b45862e1BBd9")
            })
            .then(balance => {
                assert.equal(balance.valueOf(), 700 , 'account 0 balance is wrong');
            })
    });
});
