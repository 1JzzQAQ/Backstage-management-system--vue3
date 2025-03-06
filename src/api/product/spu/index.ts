import request from "@/utils/request";
import type { HasSpuResponseData } from "./types";

enum API {
    //获取已有的spu
    HASSPU_URL = '/admin/product/'
}

//获取某个三级分类下已有的spu数据
export const reqHasSpu = (page: number, limit: number, category3Id: string | number)=>request.get<any,HasSpuResponseData>(API.HASSPU_URL+`${page}/${limit}?category3Id=${category3Id}`)