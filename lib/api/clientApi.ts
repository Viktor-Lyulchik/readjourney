import { isAxiosError } from 'axios';
import { nextServer } from './api';
import { LoginRequest, RegisterRequest, UpdateRequest } from '@/types/auth';
import { User } from '@/types/user';
import { ColorOfGood, Gender, Good, Size } from '@/types/good';
import { serializeParams } from '../utils';

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/users/signup', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/users/signin', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/users/signout');
};

export const currentUser = async (): Promise<void> => {
  await nextServer.post('/users/current');
};

export const refreshTokens = async (): Promise<void> => {
  await nextServer.post('/users/current/refresh');
};

// export async function updateMe(update: Partial<UpdateRequest>): Promise<User> {
//   try {
//     const { data } = await nextServer.patch<User>(
//       '/users/current/refresh',
//       update
//     );
//     return data;
//   } catch (error) {
//     if (isAxiosError(error)) {
//       throw new Error(
//         error.response?.data?.message || 'Updating profile failed'
//       );
//     }
//     throw new Error('Updating profile failed');
//   }
// }

export interface paginationMeta {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface FetchGoodsResponse {
  data: Good[];
  success: boolean;
  message?: string;
  meta: paginationMeta;
}

export interface FetchGoodByIdResponse {
  data: Good;
  success: boolean;
  message?: string;
}

export interface FetchGoodsParam {
  page?: string;
  perPage?: string;
  gender?: Gender;
  category?: string;
  good?: string[];
  size?: Size[];
  colors?: ColorOfGood[];
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function fetchGoodsClient(
  param: FetchGoodsParam
): Promise<FetchGoodsResponse> {
  const {
    page = 1,
    perPage = 12,
    gender,
    category,
    good,
    size,
    colors,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  } = param;
  try {
    const params: FetchGoodsParam = {
      page: String(page),
      perPage: String(perPage),
    };
    if (gender) params.gender = gender;
    if (category) params.category = category;
    if (good) params.good = good;
    if (size) params.size = size;
    if (colors) params.colors = colors;
    if (minPrice) params.minPrice = String(minPrice);
    if (maxPrice) params.maxPrice = String(maxPrice);
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;

    const { data } = await nextServer.get<FetchGoodsResponse>('/goods', {
      params,
      paramsSerializer: {
        serialize: serializeParams,
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Fetching goods failed');
    }
    throw new Error('Fetching goods failed');
  }
}

export async function fetchGoodById(
  id: string
): Promise<FetchGoodByIdResponse> {
  try {
    const { data } = await nextServer.get<FetchGoodByIdResponse>(
      `/goods/${id}`,
      { withCredentials: false }
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Fetching good failed');
    }
    throw new Error('Fetching good failed');
  }
}
