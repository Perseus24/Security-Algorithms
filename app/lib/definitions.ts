export type Invoice = {
    id: string
    customer_id: string
    name: string
    date: Date
    description: string
    price: number
    quantity: number
    status: 'pending' | 'paid'
}

export type User = {
    id: string
    name: string
    email: string
    password: string
    type: 'seller' | 'buyer'
}