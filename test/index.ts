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

    const impl = await sf.impl();
    console.log(`implementation address: ${impl}`);

    // sf.

    const salt = ethers.utils.formatBytes32String('1');
    const cloneTx = await sf.cloneStore(salt);
    await cloneTx.wait();

    const cloneAddress = await sf.getCloneAddress(salt);
    console.log("cloneAddress:", cloneAddress);


    // console.log(sf)
    // sf.cloneCreated({},)
    let eventFilter = sf.filters.cloneCreated()
    let events = await sf.queryFilter(eventFilter)
    console.log(events)
    // const emitedEvent = await sf.cloneA
    // console.log(emitedEvent);




    const store = Store.attach(cloneAddress);

    await store.setValue("sex");
    // console.log("value from store: ", val);




    // let accs = await ethers.getSigners();

    // const clone1 = new ethers.Contract(
    //   cloneAddress,
    //   [
    //     'function setValue(string memory newValue) external'
    //   ],
    //   accs[1]
    // );

    // await clone1.setValue("sex");

  });

});
