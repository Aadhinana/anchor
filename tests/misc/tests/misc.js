const assert = require("assert");
const anchor = require("@project-serum/anchor");

describe("basic-1", () => {
  // Use a local provider.
  const provider = anchor.Provider.local();
  const program = anchor.workspace.Shared;
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  it("Creates and initializes an account in a single atomic transaction (simplified)", async () => {
    // #region code-simplified

    // The Account to create.
    const myAccount1 = anchor.web3.Keypair.generate();

    // Create the new account and initialize it with the program.
    // #region code-simplified
    await program.rpc.initialize(new anchor.BN(1234), {
      accounts: {
        myAccount: myAccount1.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [myAccount1],
    });
    // #endregion code-simplified

    // Fetch the newly created account from the cluster.
    const account1 = await program.account.myAccount.fetch(myAccount1.publicKey);

    // Check it's state was initialized.
    assert.ok(account1.data.eq(new anchor.BN(1234)));

    // Store the account for the next test.
    _myAccount1 = myAccount1;
  });
  it("Updates a previously created account", async () => {
    const myAccount1 = _myAccount1;

    // #region update-test
    // Invoke the update rpc.
    await program.rpc.update(new anchor.BN(4321), {
      accounts: {
        myAccount: myAccount1.publicKey,
      },
    });

    // Fetch the newly updated account.
    const account1 = await program.account.myAccount.fetch(myAccount1.publicKey);

    // Check it's state was mutated.
    assert.ok(account1.data.eq(new anchor.BN(4321)));

    // #endregion update-test
  });

  // Vectors
  // it("Creates and initializes an account in a single atomic transaction (simplified)", async () => {
  //   // #region code-simplified

  //   // The Account to create.
  //   const myAccount1 = anchor.web3.Keypair.generate();
  //   const myAccount2 = anchor.web3.Keypair.generate();

  //   // Create the new account and initialize it with the program.
  //   // #region code-simplified
  //   await program.rpc.initialize(new anchor.BN(1234), {
  //     accounts: {
  //       myAccount: [myAccount1.publicKey, myAccount2.publicKey],
  //       user: provider.wallet.publicKey,
  //       systemProgram: anchor.web3.SystemProgram.programId,
  //     },
  //     signers: [myAccount1, myAccount2],
  //   });
  //   // #endregion code-simplified

  //   // Fetch the newly created account from the cluster.
  //   const account1 = await program.account.myAccount.fetch(myAccount1.publicKey);
  //   const account2 = await program.account.myAccount.fetch(myAccount2.publicKey);

  //   // Check it's state was initialized.
  //   assert.ok(account1.data.eq(new anchor.BN(1234)));
  //   assert.ok(account2.data.eq(new anchor.BN(1234)));

  //   // Store the account for the next test.
  //   _myAccount1 = myAccount1;
  //   _myAccount2 = myAccount2;
  // });
  // it("Updates a previously created account", async () => {
  //   const myAccount1 = _myAccount1;
  //   const myAccount2 = _myAccount2;

  //   // #region update-test

  //   // Invoke the update rpc.
  //   await program.rpc.update(new anchor.BN(4321), {
  //     accounts: {
  //       myAccount: [myAccount1.publicKey, myAccount2.publicKey],
  //     },
  //   });

  //   // Fetch the newly updated account.
  //   const account1 = await program.account.myAccount.fetch(myAccount1.publicKey);
  //   const account2 = await program.account.myAccount.fetch(myAccount2.publicKey);

  //   // Check it's state was mutated.
  //   assert.ok(account1.data.eq(new anchor.BN(4321)));
  //   assert.ok(account2.data.eq(new anchor.BN(4321)));

  //   // #endregion update-test
  // });
});