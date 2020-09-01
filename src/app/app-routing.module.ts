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
    path: 'sel-category',
    loadChildren: () => import('./select/sel-category/sel-category.module').then( m => m.SelCategoryPageModule)
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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
