import { isCommunityResourcable } from "@ethersproject/providers";
import { expect } from "chai";
import { sign } from "crypto";
import { ethers } from "hardhat";
import { emit } from "process";

describe("Greeter", function () {



  // it("Should deploy master Pair contract", async function () {
  //   pairMaster = await (await ethers.getContractFactory("Pair")).deploy();
  //   pairStandaloneGas = await getGas(pairMaster.deployTransaction)
  //   expect(pairMaster.address).to.exist;
  // });

  // it("Should deploy PairFactory contract", async function () {
  //   pairFactory = await (await ethers.getContractFactory("PairFactory")).deploy(pairMaster.address);
  //   expect(pairFactory.address).to.exist;
  // });

  it("Should return the new greeting once it's changed", async function () {
    const Store = await ethers.getContractFactory("Store");
    const StoreFactory = await ethers.getContractFactory("StoreFactory");

    const storeMaster = await Store.deploy();
    await storeMaster.deployed();

    const sf = await StoreFactory.deploy(storeMaster.address);
    await sf.deployed();

    let eventFilter = sf.filters.cloneCreated()

    const impl = await sf.impl();
    console.log(`implementation address: ${impl}`);

    const salt = ethers.utils.formatBytes32String('1');
    const cloneTx = await sf.cloneStore(salt);
    await cloneTx.wait();

    let events = await sf.queryFilter(eventFilter);
    console.log("first  clone creation event: ", events, "\n");

    const store = Store.attach(events[0].args.cloned);
    await store.setValue("message");



    console.log("\n\n\n\n");

    // second clone creation
    const secondCloneSalt = ethers.utils.formatBytes32String('2');
    const cloneTx2 = await sf.cloneStore(secondCloneSalt);
    await cloneTx2.wait();

    let eventsFromSecondClone = await sf.queryFilter(eventFilter);
    console.log("second clone creation event: ", eventsFromSecondClone, "\n");

    const secondStoreClone = Store.attach(eventsFromSecondClone[1].args.cloned);
    await secondStoreClone.setValue("message");
  });

});
