
// 模拟call
Function.prototype._call = function (content) {
  content = content ? Object(content) : window; // 判断参数是否为null || undefined
  const Fn = Symbol("Fn"); // 用symbol构造临时属性以免原有属性被覆盖
  let args = [...arguments].slice(1); // 去除第一个参数
  content.Fn = this; // 修改this指向
  const result = content.Fn(...args); // 执行
  delete content.Fn; //删除临时属性
  return result;//返回值
};

// 模拟apply 原理类似只是参数不同
Function.prototype._apply = function(content,arr){
    content = content ? Object(content) : window
    const Fn = Symbol('Fn');
    content.Fn = this
    let result;
    if(!arr){
        result = content.Fn();
    }else{
        result = content.Fn(...arr);
    }
    delete content.Fn
    return result
}

Function.prototype._bind = function(content){
    if (typeof this !== "function") {
      throw new Error(
        "Function.prototype.bind - what is trying to be bound is not callable"
      );
    }
    let self = this
    let args = [...arguments].slice(1)
    
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);

        return self.apply(
          this instanceof fBound ? this : content,
          args.concat(bindArgs)
        );
    };
    fBound.prototype = Object.create(this.prototype);
    return fBound;
}

var value = 2;
var foo = {
  value: 1,
};
function bar(name, age) {
  this.habit = "shopping";
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = "kevin";

var bindFoo = bar._bind(foo, "Jack");
console.log(bindFoo(20));
// bindFoo.prototype.lalala = "123";
// var obj = new bindFoo(20);


// console.log(bindFoo(20));
