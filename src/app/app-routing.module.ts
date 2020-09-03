import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-transaction',
    loadChildren: () => import('./add-transaction/add-transaction.module').then( m => m.AddTransactionPageModule)
  },
  {
    path: 'sel-account',
    loadChildren: () => import('./select/sel-account/sel-account.module').then( m => m.SelAccountPageModule)
  },
  {
    path: 'sel-category-expenses',
    loadChildren: () => import('./select/sel-category-expenses/sel-category-expenses.module').then( m => m.SelCategoryExpensesPageModule)
  },
  {
    path: 'sel-category-income',
    loadChildren: () => import('./select/sel-category-income/sel-category-income.module').then( m => m.SelCategoryIncomePageModule)
  },
  {
    path: 'anual-expense-income',
    loadChildren: () => import('./graphs/anual-expense-income/anual-expense-income.module').then( m => m.AnualExpenseIncomePageModule)
  },
  {
    path: 'mensual-categories',
    loadChildren: () => import('./graphs/mensual-categories/mensual-categories.module').then( m => m.MensualCategoriesPageModule)
  },
  {
    path: 'anual-categories',
    loadChildren: () => import('./graphs/anual-categories/anual-categories.module').then( m => m.AnualCategoriesPageModule)
  },
  {
    path: 'options',
    loadChildren: () => import('./options/options.module').then( m => m.OptionsPageModule)
  },
  {
    path: 'edit-categories',
    loadChildren: () => import('./edit/edit-categories/edit-categories.module').then( m => m.EditCategoriesPageModule)
  },
  {
    path: 'edit-accounts',
    loadChildren: () => import('./edit/edit-accounts/edit-accounts.module').then( m => m.EditAccountsPageModule)
  },
  {
    path: 'add-account',
    loadChildren: () => import('./add-account/add-account.module').then( m => m.AddAccountPageModule)
  },
  {
    path: 'add-category',
    loadChildren: () => import('./add-category/add-category.module').then( m => m.AddCategoryPageModule)
  },
  {
    path: 'edit-one-account',
    loadChildren: () => import('./edit/edit-one-account/edit-one-account.module').then( m => m.EditOneAccountPageModule)
  },
  {
    path: 'edit-one-category',
    loadChildren: () => import('./edit/edit-one-category/edit-one-category.module').then( m => m.EditOneCategoryPageModule)
  },
  {
    path: 'sel-account-transfers',
    loadChildren: () => import('./select/sel-account-transfers/sel-account-transfers.module').then( m => m.SelAccountTransfersPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
