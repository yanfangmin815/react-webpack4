/*
使用axios封装的ajax请求方法
 */

export default function ajax(request) {
  let {url, data, type, baseURL} = request;
  if (type === 'GET') {
    // 准备url query参数数据
    let dataStr = '' //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
    // 发送get请求
    return baseURL.get(url)
  } else {
    // 发送post请求
    return baseURL.post(url, data)  // data: 包含请求体数据的对象
  }

}
