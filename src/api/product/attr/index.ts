//这里是书写属性相关的API文件
import request from "@/utils/request";
import type { AttrResponseData, CategoryResponseData, Attr } from "./type";
//属性管理模块接口地址
enum API {
    C1_URL = "/admin/product/getCategory1",
    C2_URL = "/admin/product/getCategory2/",
    C3_URL = "/admin/product/getCategory3/",
    // 获取分类下已有的属性和属性值接口
    ATTR_URL = "/admin/product/attrInfoList/",
    //添加修改已有属性的接口
    ADDORUPDATEATTR_URL = "/admin/product/saveAttrInfo",
    DELETEATTR_URL = "/admin/product/deleteAttr/"
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
export const reqC2 = (category1Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + category1Id);
export const reqC3 = (category2Id: number | string) => request.get<any, CategoryResponseData>(API.C3_URL + category2Id);
// 获取分类下属性属性值接口
export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)
//新增或修改已有属性接口
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
export const reqDeleteAttr = (attrId: number) => request.delete<any, any>(API.DELETEATTR_URL + attrId)