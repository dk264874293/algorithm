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
      let numsLen = nums.length - 1;
      let num = 0;
      let sunArr = [];
      let newArr = nums.filter((_) => target > 0 ? _ > target : _ < target );
      while (num <= numsLen) {
          console.log(nums[num], target);
        // if (
        //   (target >= 0 && nums[num] > target) ||
        //   (target < 0 && nums[num] < target)
        // ) {
        //   num++;
        //   continue;
        // }
        const cha = target - nums[num];
        console.log(cha, target, nums[num]);
        let mounIndex = -1;
        for (let i = num + 1; i <= numsLen; i++) {
            console.log(nums[i] === cha, nums[i]);
          if (nums[i] === cha) {
            mounIndex = i;
            continue;
          }
        }
        if (mounIndex >= 0) {
          sunArr = [num, mounIndex];
          break;
        } else {
          num++;
        }
      }
      return sunArr;
    };
    console.log(twoSum([-18, 12, 3, 0], -6));
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

leetCode146_v2()