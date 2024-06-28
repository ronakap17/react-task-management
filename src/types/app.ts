export interface AppError {
  success: boolean;
  message: string;
}

export interface RouteError {
  message: string;
}



export type SortByPayload<T> = {
  sortBy?: keyof T;
  sortOrder?: "asc" | "desc";
};

export interface FetchRequestPayload<T> extends SortByPayload<T> {
  search?: string;
  page?: number;
  perPage?: number;
};

export type FetchRequestPayloadOrVoid<T> = FetchRequestPayload<T> | void
