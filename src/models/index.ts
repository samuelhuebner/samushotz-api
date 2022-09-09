export interface EmailRequestBody {
    name: string;
    email: string;
    phone?: string;
    selectedCategory?: string;
    message: string;
    reachedThrough?: string;
    selectedDate: Date;
}
