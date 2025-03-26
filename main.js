class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    constructor(array) {
      const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
      this.root = this.buildTree(uniqueSortedArray);
    }
  
    buildTree(array) {
      if (array.length === 0) return null;
  
      const mid = Math.floor(array.length / 2);
      const root = new Node(array[mid]);
  
      root.left = this.buildTree(array.slice(0, mid));
      root.right = this.buildTree(array.slice(mid + 1));
  
      return root;
    }

    insert(value) {
      const newNode = new Node(value);
  
      if (!this.root) {
        this.root = newNode;
        return;
      }
  
      let current = this.root;
      while (current) {
        if (value < current.data) {
          if (!current.left) {
            current.left = newNode;
            break;
          }
          current = current.left;
        } else if (value > current.data) {
          if (!current.right) {
            current.right = newNode;
            break;
          }
          current = current.right;
        } else {
          break;
        }
      }
    }

    deleteItem(value) {
      this.root = this.deleteNode(this.root, value);
    }
  
    deleteNode(root, value) {
      if (!root) return null;

      if (value < root.data) {
        root.left = this.deleteNode(root.left, value);
      } else if (value > root.data) {
        root.right = this.deleteNode(root.right, value);
      } else {
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        root.data = this.minValue(root.right);
        root.right = this.deleteNode(root.right, root.data);
      }
  
      return root;
    }
  
    minValue(node) {
      let current = node;
      while (current.left) {
        current = current.left;
      }
      return current.data;
    }
  
    find(value) {
      let current = this.root;
      while (current) {
        if (value === current.data) return current;
        current = value < current.data ? current.left : current.right;
      }
      return null;
    }
  
    levelOrder(callback) {
      if (!callback) throw new Error('Callback is required');
  
      if (!this.root) return;
  
      const queue = [this.root];
      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);
  
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }

    inOrder(callback) {
      if (!callback) throw new Error('Callback is required');
      this.inOrderTraversal(this.root, callback);
    }
  
    inOrderTraversal(node, callback) {
      if (!node) return;
      this.inOrderTraversal(node.left, callback);
      callback(node);
      this.inOrderTraversal(node.right, callback);
    }
 
    preOrder(callback) {
      if (!callback) throw new Error('Callback is required');
      this.preOrderTraversal(this.root, callback);
    }
  
    preOrderTraversal(node, callback) {
      if (!node) return;
      callback(node);
      this.preOrderTraversal(node.left, callback);
      this.preOrderTraversal(node.right, callback);
    }

    postOrder(callback) {
      if (!callback) throw new Error('Callback is required');
      this.postOrderTraversal(this.root, callback);
    }
  
    postOrderTraversal(node, callback) {
      if (!node) return;
      this.postOrderTraversal(node.left, callback);
      this.postOrderTraversal(node.right, callback);
      callback(node);
    }

    height(node) {
      if (!node) return -1;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    depth(node) {
      if (!node) return -1;
      let current = this.root;
      let depth = 0;
  
      while (current) {
        if (node.data === current.data) return depth;
        current = node.data < current.data ? current.left : current.right;
        depth++;
      }
  
      return -1;
    }
  
    isBalanced() {
      const checkBalance = (node) => {
        if (!node) return true;
  
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
  
        if (Math.abs(leftHeight - rightHeight) > 1) return false;
  
        return checkBalance(node.left) && checkBalance(node.right);
      };
  
      return checkBalance(this.root);
    }
  
    rebalance() {
      const elements = [];
      this.inOrder(node => elements.push(node.data));
      this.root = this.buildTree(elements);
    }
  }
  
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
       prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  

  const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
  
  console.log("Initial Tree (Balanced):");
  prettyPrint(bst.root);
  
  console.log("\nIs Balanced:", bst.isBalanced());
  
  console.log("\nLevel Order Traversal:");
  bst.levelOrder(node => console.log(node.data));
  
  console.log("\nPre-Order Traversal:");
  bst.preOrder(node => console.log(node.data));
  
  console.log("\nPost-Order Traversal:");
  bst.postOrder(node => console.log(node.data));
  
  console.log("\nIn-Order Traversal:");
  bst.inOrder(node => console.log(node.data));
  

  for (let i = 0; i < 5; i++) {
    bst.insert(Math.floor(Math.random() * 1000));
  }
  
  console.log("\nUnbalanced Tree:");
  prettyPrint(bst.root);
  
  console.log("\nIs Balanced:", bst.isBalanced());
  

  bst.rebalance();
  
  console.log("\nRebalanced Tree:");
  prettyPrint(bst.root);
  
  console.log("\nIs Balanced:", bst.isBalanced());