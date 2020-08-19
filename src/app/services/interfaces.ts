export interface Account{
    name: string;
    initial_balance: number;
    icon: string;
}

export interface Category{
    name: string;
    icon: string;
    parent: string;
    type: string;
    type2: string;
}

export interface Transaction{
    category: Category;
    account: Account;
    value: number;
    note: string;
    date: string;
    id: string;
}