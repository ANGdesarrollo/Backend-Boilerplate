interface Item {
    id: string;
    category_id: string;
    currency_id: string;
    description: string;
    title: string;
    quantity: number;
    unit_price: number;
}

export interface CreateOrderPayload {
    items: Item[];
}
