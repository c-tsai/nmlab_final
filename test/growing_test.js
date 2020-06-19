const Sprout = artifacts.require("Sprout");


contract("Sprout", async accounts => {
    it("Test growing", async () => {
        let contract = await Sprout.deployed()
        await contract.Register(accounts[0]);
        await contract.randomAddSprout(0,0);
        function timeout(ms){return new Promise(resolve => setTimeout(resolve, ms));}
        await timeout(1080000);
        let width = await contract.getSproutWidth(0,0);
        assert.equal(width, 4 , 'seed should be wrinkled');
        let height = await contract.getSproutHeigtht(0,0);
        assert.equal(height, 9 , 'seed should be wrinkled');
        await contract.plugSprout(0,0)    
        let balance = await contact.balanceOf(account[0]);
        assert.equal(height, 736 , 'wrong price');
    });
});
