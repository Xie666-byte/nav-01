//将最后一个li找出来
const $lastLi= $('.siteList').find('li.last')
const $siteList=$('.siteList')
//localSorage.getItem接受一个key，获取指定key本地存储的值
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)
//如果xObject存在，就用xObject;如果不存在，就用默认数组
const hashMap=xObject||[
    {logo:'A',url:'https://www.acfun.cn'},
    {logo:'B',url:'https://www.bilibili.com'}
]
let simplifyUrl=(url)=>{
    return url.replace("https://","").replace("http://","").replace("www.","").
    replace(/\/.*/,"")//删除/开头的内容
}

//遍历哈希表，将哈希表的每一项插入到last的li前面
let render=()=>{
    //获取除了类名为.last的li以外的所有li,然后删掉
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        //创建li，并且插入到最后一个li的前面
        const $li=$(`
        <li>
                        <div class="site">
                            <div class="logo">${node.logo}</div>
                            <div class="link">${simplifyUrl(node.url)}</div>
                            <div class="close">
                            <svg class="icon icon-1">
                              <use xlink:href="#icon-guanbi">
                              </use>
                            </svg>
                            </div>
                        </div>
                </li>
        `).insertBefore($lastLi)
        
        $li.on('click',()=>{
            window.open(node.url)
        })
        //监听.close
        $li.on('click',".close",(e)=>{
            //阻止冒泡
            e.stopPropagation()
            console.log(hashMap)
            //删除哈希表的当前元素
            hashMap.splice(index,1)
            console.log(hashMap)
            render()
        })
    })
}
render()
//点击后，触发回调函数
$('.addButton').on('click',()=>{
    let url= window.prompt('请问您要输入的网址是啥？')
    if(url.indexOf('https')!==0){
        url='https://'+url
    }
    console.log(url)
    //向哈希表添加一项
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url
    })
    //再次渲染（调用）哈希表
    render()
})
//用户关闭网页时发生的事件
window.onbeforeunload=()=>{
    //localStorage只能存字符串，不能存对象
    console.log('页面要关闭了')
    const string=JSON.stringify(hashMap)
    //将value存储到key字段
    localStorage.setItem('x',string)
}
$(document).on('keypress',(item)=>{
    const {key}=item
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})