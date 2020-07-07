// leetcode 88

function leetCode88() {
  let nums1 = [1, 2, 3, 0, 0, 0];
  let nums2 = [2, 5, 6];

  var merge = function (nums1, m, nums2, n) {
    let lenIndex = m + n - 1;
    let mIndex = m - 1;
    let nIndex = n - 1;
    while (nIndex >= 0) {
      if (mIndex < 0) {
        nums1[lenIndex--] = nums2[nIndex--];
        continue;
      }
      if (nums1[mIndex] < nums2[nIndex]) {
        nums1[lenIndex] = nums2[nIndex];
        nIndex--;
        lenIndex--;
      } else {
        nums1[lenIndex] = nums1[mIndex];
        lenIndex--;
        mIndex--;
      }
    }
    return nums1;
  };
  console.log(merge(nums1, 3, nums2, 3));
  console.log(merge([0], 0, [1], 1));
}

function leetCode215(){
    let num = [3, 2, 1, 5, 6, 4];
    
    function arrIndex(arr,k){
        let arrList = arr.sort((a, b) => b - a);
        return arrList[k - 1];
    }
    console.log(arrIndex(num,2));
}

// leetCode215()

function leetCode1(){
    var twoSum = function (nums, target) {
      let hashTable = {};
      for(const [key, value] of nums.entries()){
        hashTable[value] = {
          index: key,
          val: value,
        };
      }
      for(let i = 0; i < nums.length;i++){
        const difference = target - nums[i];
        if (!!hashTable[difference] && hashTable[difference]['index'] !== i) {
          return [i, hashTable[difference]["index"]];
        }
      }
      return [];
    };
    console.log(twoSum([3, 2, 4], 6));
}

// leetCode1()

function leetCode146_v1() {
  var LRUCache = function (capacity) {
    this.val = []
    this.max = capacity;
  };


  /**
   * @param {number} key
   * @return {number}
   */
  LRUCache.prototype.get = function (key,value) {
      const { val } = this;
      const valLen = val.length
      let valIndex = -1;
      let thatData = null
      for(let i = 0; i < valLen;i++){
          if (val[i]["key"] === key) {
            valIndex = i ;
            if(value){
                val[i]["value"] = value;
            }
            thatData = val[i];
            break;
          }
      }
       if (valIndex >= 0) {
        val.splice(valIndex , 1);
        val.push(thatData);
       } 
      return valIndex >= 0 ? thatData["value"] : -1;
  };

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  LRUCache.prototype.put = function (key, value) {
      const {val,max} = this
      let valIndex = this.get(key, value);
      if (valIndex === -1) {
        if (val.length === max) {
            val.splice(0, 1);
        }
        val.push({
            key,
            value,
        });
      }
      console.log(val)
      
  };

   var cache = new LRUCache(2);
    cache.put(2, 1);
    cache.put(2, 2);
    console.log(  cache.get(2))
    // cache.put(1, 1); 
    // cache.put(4, 1); 
    // cache.get(2);
    
//    obj.put(key,value)
}

// leetCode146_v1();

function leetCode146_v2() {
  class Listnode {
    constructor(key, val) {
      this.key = key;
      this.val = val;
      this.next = null;
      this.prev = null;
    }
  }

  class LRUCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.hashTable = {};
      this.count = 0;
      this.dummyHead = new Listnode();
      this.dummyTail = new Listnode();
      this.dummyHead.next = this.dummyTail;
      this.dummyTail.prev = this.dummyHead;
    }

    get(key) {
      const node = this.hashTable[key];
      if (node === null || node === undefined) {
        return -1;
      }
      this.moveToHead(node);
      return node.val;
    }

    moveToHead(node) {
      this.removeFromList(node);
      this.addToHead(node);
    }

    addToHead(node) {
      this.dummyTail.prev.next = node;
      node.prev = this.dummyTail.prev;
      this.dummyTail.prev = node;
      node.next = this.dummyTail;
      this.hashTable[node.key] = node;
      this.count++;
    }

    removeFromList(node) {
      const thatNext = node.next;
      const thatPrev = node.prev;
      // console.log(thatNext, 'next');
      // console.log(thatPrev,'prev');
      thatPrev.next = thatNext;
      thatNext.prev = thatPrev;
      this.hashTable[node.key] = null;
      this.count--;
    }
    removeLRUItem() {
      const itemKey = this.dummyHead.next["key"];
      this.hashTable[itemKey] = null;
      this.dummyHead.next = this.dummyHead.next.next;
      this.dummyHead.next.prev = this.dummyHead;
      this.count--;
    }

    put(key, value) {
      const node = this.hashTable[key];
      if (node === null || node === undefined) {
        const new_node = new Listnode(key, value);
        if (this.count === this.capacity) {
          this.removeLRUItem();
        }
        this.addToHead(new_node);
      } else {
        node.val = value;
        this.moveToHead(node);
      }
    }
  }

  var cache = new LRUCache(2);
  cache.put(2, 1); // [1]
  cache.put(2, 2); // [1,2]
//   console.log(cache);
  console.log(cache.get(2));
//   console.log(cache.get(1)); //[2,1]
//   cache.put(3, 3); //[1,3]
//   console.log(cache);
//   console.log(cache.dummyHead.next, cache.dummyHead.next.next, cache.dummyTail);
//   console.log(cache.get(2)); //[1,3]
//   cache.put(4, 4);
//   console.log(cache.get(1)); // -1
  // cache.put(1, 1);
  // cache.put(4, 1);
//   console.log(cache.get(3));
// console.log(cache.get(4));
  // cache.get(3);

  //    obj.put(key,value)
}

// leetCode146_v2()
function leetCode1470(nums, n) {
  let newList = []
  for(let i = 0; i < n; i++){
    newList.push(nums[i]);
    newList.push(nums[i + n]);
  }
  return newList;
};

// console.log(leetCode1470([2, 5, 1, 3, 4, 7], 3));

function leetCode14731(candies, extraCandies) {
  const Max = Math.max(...candies);
  return candies.map((_) => _ + extraCandies >= Max);
}

// leetCode14731([2, 3, 5, 1, 3], 3);

// function leetCode1486(n, start) {}

function leetCode378(matrix, k) {
  // const matrixLen = matrix[0].length;
  // const lenNum = k === matrixLen ? 0 : parseInt(k / matrixLen)
  // if (lenNum  === 0){
  //   return matrix[0][k-1]
  // }else{
  //   return matrix[lenNum][k % (matrixLen * lenNum) - 1];
  // }
  return matrix
    .join()
    .split(",")
    .sort((a, b) => Number(a) - Number(b))[k - 1];



  //   if (k > matrixLen) {
  //     fetch = lenNum > 0 ? k % (matrixLen * lenNum) : k % matrixLen;
  //   } else {
  //     fetch = k;
  //   }
  // return matrix[lenNum > 0 ? lenNum - 1 : 0][fetch];
};

// console.log(
//   leetCode378(
//     [
//       [1, 5, 9],
//       [10, 11, 13],
//       [12, 13, 15],
//     ],
//     8
//   )
// );
// console.log(leetCode378([[-5]], 1));
// console.log(
//   leetCode378(
//     [
//         [1, 2],
//         [1, 3],
//     ],
//     2
//   )
// );




// var mergeTwoLists = function (l1, l2) {
//   let newLinked = ListNode();
//   let linkedFoot = null;
//   let nodeOne = l1;
//   while (nodeOne) {
//     nodeOne = nodeOne.next;
//   }
// };

function leetcode155(){
  var MinStack = function () {
    this.stack = [];
    this.length = 0;
    this.minList = [];
  };

  MinStack.prototype.push = function (x) {
    const { minList } = this
    const len = minList.length;
    minList.push(x);
    if( len > 0 && minList[len - 1] > x){
      for (let i = len - 1; i >= 0; i--) {
        if (minList[i] > x) {
          const item = minList[i];
          minList[i] = x;
          minList[i + 1] = item;
        } else {
          continue
        }
      }
    }
    this.stack.push(x);
    this.length++;
  };
   
  MinStack.prototype.pop = function () {
    const {length,minList,stack} = this
    const len = length - 1
    const top = stack[len]
    const minIndex = minList.indexOf(top);
    if (minIndex>=0){
      this.minList.splice(minIndex,1);
    } 
   this.stack.splice(len, 1);
    this.length--;
  };

  MinStack.prototype.top = function () {
    return this.stack[this.length - 1];
  };

  MinStack.prototype.getMin = function () {
    return  this.minList.length > 0 ? this.minList[0] : null
  };
    const minStack = new MinStack();
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    minStack.pop();
    console.log(minStack.stack);
    console.log(minStack.top());
    // minStack.getMin();  
    // minStack.pop();
    // minStack.top();     
    // minStack.getMin();   

}

// leetcode155()