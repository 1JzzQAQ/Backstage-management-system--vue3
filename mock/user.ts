//此函数执行会返回一个数组，数组里面包含2个用户信息
function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.jhiPipSVFvQ6zNQ43uI3SwHaHa?rs=1&pid=ImgDetMain',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Adimin Token',
    },
    {
      userId: 2,
      avatar:
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.jhiPipSVFvQ6zNQ43uI3SwHaHa?rs=1&pid=ImgDetMain',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}

//对外暴露一个数组，里面包含2个接口。
export default [
  //用户登陆接口
  {
    url: '/api/user/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }) => {
      //获取请求携带过来的用户名和密码
      const { username, password } = body
      //调用函数查看是否有此用户
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      )
      if (!checkUser) {
        return { code: 201, data: { message: '账号或密码不正确' } }
      }
      const { token } = checkUser
      return { code: 200, data: { token } }
    },
  },
  //获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token
      const checkUser = createUserList().find((item) => item.token === token)
      if (!checkUser) {
        return { code: 201, data: { message: '获取用户信息失败' } }
      }
      return { code: 200, data: { checkUser } }
    },
  },
]
