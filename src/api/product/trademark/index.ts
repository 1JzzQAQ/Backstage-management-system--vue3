// 品牌管理模块接口
import request from "@/utils/request";
import type { TradeMark, TradeMarkResponseData } from "./type";
//品牌管理模块接口地址
enum API {
    //获取已有品牌接口
    TRADEMARK_URL = "/admin/product/baseTrademark/",
    //添加品牌接口
    ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
    //修改已有品牌接口
    UPDATATRADEMARK_URL = "/admin/product/baseTrademark/update",
    //删除已有品牌接口
    DELETE_URL = "/admin/product/baseTrademark/remove/"
}
//获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
//添加与修改品牌接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATATRADEMARK_URL, data)
    } else {
        return request.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
}
//删除已有品牌
export const reqDeleteTrademark = (id: number) => request.delete<any>(API.DELETE_URL + `${id}`)