use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod shared {
    use super::*;

    // Normal
    pub fn initialize(ctx: Context<Initialize>, data: u64) -> ProgramResult {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: u64) -> ProgramResult {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = data;
        Ok(())
    }

    //  Vectors
    // pub fn initialize(ctx: Context<Initialize>, data: u64) -> ProgramResult {
    //     let my_account = &mut ctx.accounts.my_account;
    //     for acc in my_account.into_iter(){
    //         acc.data = data;
    //     }
    //     // my_account.data = data;
    //     Ok(())
    // }
    // pub fn update(ctx: Context<Update>, data: u64) -> ProgramResult {
    //     let my_account = &mut ctx.accounts.my_account;
    //     for acc in my_account.into_iter(){
    //         acc.data = data;
    //     }
    //     // my_account.data = data;
    //     Ok(())
    // }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}

// Vectors
// #[derive(Accounts)]
// pub struct Initialize<'info> {
//     #[account(init, payer = user, space = 8 + 8)]
//     pub my_account: Vec<Account<'info, MyAccount>>,
//     #[account(mut)]
//     pub user: Signer<'info>,
//     pub system_program: Program<'info, System>,
// }
// #[derive(Accounts)]
// pub struct Update<'info> {
//     #[account(mut)]
//     pub my_account: Vec<Account<'info, MyAccount>>,
// }

#[account]
pub struct MyAccount {
    pub data: u64,
}
