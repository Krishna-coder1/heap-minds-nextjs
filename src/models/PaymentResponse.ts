import { BaseResponse } from "./BaseResponse";

interface CreateOrderData {
  amount: number;
  amount_paid: number;
  notes: any[];
  created_at: number;
  amount_due: number;
  currency: string;
  receipt: string;
  id: string;
  entity: string;
  offer_id: any;
  status: string;
  attempts: number;
}

export type CreateOrderResponse = BaseResponse<CreateOrderData>;
