
document.write("<h1>js可以写如html输入流</h1>");

function changeImage()
{
    element=document.getElementById('myimage')
    if (element.src.match("bulbon"))
    {
        element.src="./images/pic_bulboff.gif";
    }
    else
    {
        element.src="./images/pic_bulbon.gif";
    }
}


function test()
{
    var a = 1;
    var b = 1; b = "sb";
    /*类型检验 */
    typeof "John"                // 返回 string
    typeof 3.14                  // 返回 number
    typeof false                 // 返回 boolean
    typeof [1,2,3,4]             // 返回 object
    typeof {name:'John', age:34} // 返回 object
    /* 对象 */
    var obj = {
        name : "fzw",
        age : 22,
        alertName: function() {
            alert(this.name)
        }
    }
    //使用对象方法
    obj.alertName
}