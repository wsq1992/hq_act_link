var path  = require('path');
var host = 'http://hengqinlife-test.e-hqins.com';
var hostMap = {
  '测试环境':'http://hengqinlife-test.e-hqins.com',
  'uat环境':'http://hengqinlife-uat.e-hqins.com',
  '生产环境':'http://wechat.e-hqins.com'
}
var pagePath = '/productDetailNew';
// var params = {
//  activity:'eyJhY3Rpdml0eUlkIjoiMzA2emhsdCIsImNoYW5uZWxObyI6IjMwNiIsInNoYXJlSWQiOm51bGwsInNoYXJlRnJvbSI6bnVsbH0=',
//  agent:'WX00000003'
// };

var datalist  = require('./config.js')
/**
@params Object{ param1:value ,param1:value }
@return  '?param1=value&param1=value'
*/
function queryStringToParse(params){
  let param = [];
  for(let i in params){
    if(params[i].indexOf('=')>-1){
      params[i] = encodeURIComponent(params[i])
    }
    let str = `${i}=${params[i]}`
    param.push(str)
  }
  return `?${param.join('&')}`
}

function createLink(host ,pagePath , params){
  let param = queryStringToParse(params)
  let link = `${host}${pagePath}${param}`
  return link
}


//生产一种host所有产品的链接
function create(opt,host,EVNName){
  let title = opt.title
  let list  = opt.productList
  let activity = opt.activity
  let path = opt.path
  let params= {
    productId:'',
    activity:activity,
    agent:opt.agent
  }
  console.log('\n' + EVNName)
  list.forEach((item)=>{
    params.productId = item.productId
    console.log(item.name)
    console.log(createLink(host,path,params))
  })
}

/*
function generate(hostMap){
  let _config = config.ZHLT;
  let strs = '';
  strs = _config.title + '\n'
  console.log(_config.title)
  for(let i in hostMap){
    let host = hostMap[i];
    let name = i ;
    create(_config,host,i);
  }
}


generate(hostMap)*/

//生成所有活动链接
function generateAllLink(arr,hostMap){
  arr.forEach( (item)=>{
    let strs = ''; strs = item.title + '\n'
    console.log(item.title)
    for(let i in hostMap){
      let host = hostMap[i];
      let name = i ;
      create(item,host,name);
    }
  })
}

generateAllLink(datalist,hostMap)

// console.log(createLink(host,pagePath,params))
