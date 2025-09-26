import { CSSProperties } from "react";
import { IResponse, Params } from "./api";

export type InfiniteSelectProps<T> = {
  /**
   * Giá trị hiện tại của Select
   */
  value?: string;
  /**
   * Hàm callback khi giá trị Select thay đổi.
   * Trả về value của Select.Option được chọn.
   */
  onChange?: (val: string) => void;
  /**
   * Hàm lấy dữ liệu từ API (phải hỗ trợ phân trang để dùng InfiniteSelect)
   */
  fetchFn: (params: Params) => Promise<IResponse<T[]>>;
  /**
   * Query key dùng để cache với React Query
   */
  queryKey: string[];
  /**
   * Field hiển thị trên UI hoặc hàm trả về ReactNode
   */
  labelDataIndex: keyof T | ((item: T) => React.ReactNode);
  /**
   * Field làm value hoặc hàm trả về ReactNode
   */
  valueDataIndex: keyof T | ((item: T) => React.ReactNode);
  /**
   * Placeholder cho Select
   */
  placeholder?: string;
  /**
   * Số lượng item trên 1 page khi fetch (nên để 10)
   */
  pageSize?: number;
  /**
   * Thời gian debounce khi người dùng search (ms)
   */
  debounceTime?: number;
  /**
   * CSS tuỳ chỉnh cho container và popup
   */
  styles?: Partial<Record<"root", CSSProperties>> & {
    popup?: Partial<Record<"root", CSSProperties>>;
  };
  /**
   * CSS tuỳ chỉnh cho Select
   */
  style?: CSSProperties;
  /**
   * Vị trí hiển thị popup
   */
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  /**
   * Mode của Select: "multiple" hoặc "tags"
   */
  mode?: "multiple" | "tags";
  /**
   * Field của T dùng để search nhiều giá trị cùng lúc (multi-value search)
   *
   * - Khi truyền `filterByManyFields="studentId"`, component sẽ tách input của người dùng
   *   (ví dụ paste "CF25013,CF25012") thành mảng và gọi fetchFn với key tương ứng:
   *   `studentId[]=CF25013&studentId[]=CF25012`.
   * - Nếu không truyền prop này, component sẽ gọi fetchFn với key mặc định là `search`.
   *
   * Lưu ý: Khi dùng `filterByManyFields`, **không thể search các giá trị chứa dấu `,`**.
   *
   * @example filterByManyFields="studentId" → tìm nhiều studentId cùng lúc
   * @default undefined → search theo key `search` bình thường
   */
  filterByManyFields?: keyof T | string;
  /**
   * Khi bật `true`, sẽ có thêm nút chọn tất cả sẽ tự động chọn tất cả các option đang hiển thị.
   * Chỉ áp dụng với mode `multiple` hoặc `tags`.
   * @default false
   */
  selectAll?: boolean;
  /**
   * Số tag được hiển thị tối đa chỉ hoạt động khi sử dụng mode mutiple hoặc tag, khi truyền số thì sẽ giới hạn tag, còn khi sử dụng responsive thì sẽ hiển thị duy nhất trên 1 dòng của màn hình
   * @default undefined
   */
  maxTagCount?: number | "responsive" | undefined;
  /**
   * Bật và tắt select
   * @default false
   */
  disabled?: boolean;
  /**
    * Bổ sung thêm các option khác
    * @default []
   */
  extraOptions?: T[];
};
