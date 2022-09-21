const StoreCustomers = artifacts.require("StoreCustomers");

contract('StoreCustomers', function(accounts) {
    beforeEach(async () => {
        contract = await StoreCustomers.new();
    });

    it('Add Customer', async () => {
        await contract.addCustomer({
            name: 'Leonidas',
            age: 30
        });

        const count = await contract.count();
        assert(count.toNumber() === 1, "Couldn't add the customer.");
    });

    it('Get Customer', async () => {
        await contract.addCustomer({
            name: 'Leonidas',
            age: 30
        });

        const customer = await contract.getCustomer(1);
        assert(customer.name === 'Leonidas', "Couldn't get the customer.");
    });

    it('Edit Customer', async () => {
        await contract.addCustomer({
            name: 'Leonidas',
            age: 30
        });

        await contract.editCustomer(1, {
            name: 'Bam',
            age: 0
        });

        const customer = await contract.getCustomer(1);
        assert(customer.name === 'Bam' && customer.age == 30, "Couldn't edit the customer.");
    });

    it('Delete Customer', async () => {
        await contract.addCustomer({
            name: 'Leonidas',
            age: 30
        });

        await contract.deleteCustomer(1);
        const count = await contract.count();
        assert(count.toNumber() === 0, "Couldn't delete the customer.");
    });
})