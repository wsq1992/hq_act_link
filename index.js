var path  = require('path');
var fs  = require('fs');
var host = 'http://hengqinlife-test.e-hqins.com';
var hostMap = {
  '测试环境':'http://hengqinlife-test.e-hqins.com',
  'uat环境':'http://hengqinlife-uat.e-hqins.com',
  '生产环境':'http://wechat.e-hqins.com'
}

var datalist  = require('./config.js')

/**
@params Object{ param1:value ,param1:value }
@return  'param1=value&param1=value'
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
  return `${param.join('&')}`
}

/*生成活动URL
@param host Sting 'http://hengqinlife-test.e-hqins.com'
@param pagePath  String '/productDetialNew
@params Object  { param1:value ,param1:value }
@return String url  'http://hengqinlife-test.e-hqins.com/productDetialNew?param1=value&param1=value'
*/
function createLink(host ,pagePath , params){
  let param = queryStringToParse(params)
  let link = `${host}${pagePath}?${param}`
  return link
}

//生产一种host所有产品的链接
function createHostLinks(opt,host,EVNName){
  let length_str = '';
  let title = opt.title ;
  let list  = opt.productList;
  let activity = opt.activity;
  let path = opt.path;
  let params = opt.params;
  length_str += EVNName + '\n' ;
  list.forEach((item)=>{
    let url = ''
    params.productId = item.productId
    url = createLink(host,path,params)
    length_str += '产品名称---' + item.name + '\n';
    length_str += url + '\n';
  })
  return length_str
}

//生成所有活动链接
function generateAllLink(arr,hostMap){
  var logs = '';
  arr.forEach( (item)=>{
    logs += item.title + '\n'
    for(let i in hostMap){
      let host = hostMap[i];
      let name = i ;
      logs += '\n' + createHostLinks(item,host,name) ;
    }
  })
  // console.log(logs)
  return logs
}

writeIntxt(generateAllLink(datalist,hostMap))

function writeIntxt(str){
  let fileName = '活动链接' + getNowDate()
  fs.writeFile(fileName +'.txt',str,function(err){
    if(err){
      return console.error(err)
    }
  })
}

function getNowDate(){
  let myDate  = new Date()
  return myDate.toLocaleDateString()
}
