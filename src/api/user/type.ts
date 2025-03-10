//定义用户相关数据ts类型

//login携带参数ts类型
export interface loginFormData {
    username: string,
    password: string
}

//定义全部接口返回数据都有的ts类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

//登陆接口返回的数据类型
export interface loginResponseData extends ResponseData {
    data: string
}

export interface userInfoResponseData extends ResponseData {
    data: {
        routes: string[],
        buttons: string[],
        roles: string[],
        name: string,
        avatar: string
    }
}