export interface Category {
    category: string;
    icon?: string;
    id: number;
    parentCategoryId?: number;
    svgIcon: string;
}

export interface Bill {
    maxAmount: number;
    minAmount: number;
    // productRequiredInfo   : ProductRequiredInfo[];
    id: number;
    productCode: string;
    productName: string;
    providerId: number;
    // providerDetails       : ProviderDetails;
    productCategoryDetails: Category;
    providerProductId: string;
    creditorId: number;
    creditorAgentId: number;
    atxProductCode: string;
    sendToMastercard: boolean;
    status: string;
    categoryId: number;
    imageId: string;
    featuredImage: string;
    // productVariant        : ProductVariant[]
}

export interface BillPagination {
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}