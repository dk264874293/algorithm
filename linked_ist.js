// linked list

// 单链表
function oneLinkedList(){
    const linkedList = [1, 2, 3, 4, 5, 6];

    class Node {
      constructor(val, next) {
        this.val = val;
        this.next = next;
      }
    }

    let node = new Node(linkedList[0]);
    let prevNode = node;
    let thatNode = null;
    for (let i = 1; i<linkedList.length;i++){
        thatNode = new Node(linkedList[i], null);
        prevNode.next = thatNode;
        prevNode = thatNode;
    }
    console.log(node);

    let ptNode = node;
    while (true) {
      console.log(ptNode.val);
      if (ptNode.next) {
        ptNode = ptNode.next;
      } else {
        break;
      }
    }
}

// oneLinkedList()

// 双链表 循环链表
function bothLinkedList(){
    const linkedList = [1, 2, 3, 4, 5, 6];

    class Node {
        constructor(val,prev, next) {
        this.val = val;
        this.prev = prev;
        this.next = next;
        }
    }
    let node = new Node(linkedList[0], null, null);
    let prevNode = node;
    let thatNode = null;
    for (let i = 1; i < linkedList.length; i++) {
        thatNode = new Node(linkedList[i],prevNode, null);
        prevNode.next = thatNode;
        prevNode = thatNode;
    }
    node.prev = thatNode;
    prevNode.next = node
  
}

// bothLinkedList()



