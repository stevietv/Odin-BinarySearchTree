import Node from './node.js';
import { mergeSort } from './mergesort.js';

class Tree {
  constructor(array) {
    this.root = this.buildTree(array)
  }

  buildTree(array, start = 0, end, sorted = false) {
    if (!sorted) {
      array = [...new Set(array)];
      array = mergeSort(array);
      end = array.length - 1;
      sorted = true;
    }

    if (start > end)
      return null;

    let mid = Math.floor((start + end) / 2);

    let rootNode = new Node(array[mid]);

    rootNode.left = this.buildTree(array, start, mid - 1, sorted);
    rootNode.right = this.buildTree(array, mid + 1, end, sorted);

    return rootNode;
  }

  insert(value, node = this.root) {
    if (node === null)
      return new Node(value);

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  delete(value, node = this.root) {
    if (node === null) {
      return node;
    }

    if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
    } else {

      // case 1 - leaf node
      if (node.left === null && node.right === null) {
        return null;
      }

      //case 2 - has one left child
      if (node.left !== null && node.right === null)
        return node.left;

      //case 3 - has one right child
      if (node.left === null && node.right !== null)
        return node.right;

      //case 4 - has both children
      //first find the next following number (going first right then all the way left)
      //swap that one in and remove the old successor value from the subnode
      if (node.left !== null && node.right !== null) {
        let successor = node.right;
        while (successor !== null && successor.left !== null) {
          successor = successor.left;
        }
        if (successor) {
          node.data = successor.data;
          node.right = this.delete(successor.data, node.right);
        }
      }
    }
    return node;
  }

  find(value, node = this.root) {
    if (node === null) {
      return null;
    }
    if (value < node.data) {
      return this.find(value, node.left);
    }
    if (value > node.data) {
      return this.find(value, node.right);
    } else return node;
  }


  // Breadth First Search
  levelOrderForEach(callback = null) {

    try {
      if (callback === null || callback === undefined) {
        throw new Error("no callback function provided")
      }

      const queue = [];
      queue.push(this.root);

      while (queue.length > 0) {
        let currentNode = queue[0];

        callback(currentNode);

        if (currentNode.left !== null) {
          queue.push(currentNode.left);
        }

        if (currentNode.right !== null) {
          queue.push(currentNode.right);
        }

        queue.shift();
      }
    } catch (err) {
      console.log(err);
    }
  }


  // Depth First Search
  preorder(callback = null, node = this.root) {
    try {
      if (callback === null || callback === undefined) {
        throw new Error("no callback function provided")
      }

      if (node === null) {
        return;
      }

      callback(node);

      this.preorder(callback, node.left);
      this.preorder(callback, node.right);
    } catch (err) {
      console.log(err);
    }
  }

  // Depth First Search
  inorder(callback = null, node = this.root) {
    try {
      if (callback === null || callback === undefined) {
        throw new Error("no callback function provided")
      }

      if (node === null) {
        return;
      }

      this.inorder(callback, node.left);
      callback(node);
      this.inorder(callback, node.right);
    } catch (err) {
      console.log(err);
    }
  }

  // Depth First Search
  postorder(callback = null, node = this.root) {
    try {
      if (callback === null || callback === undefined) {
        throw new Error("no callback function provided")
      }

      if (node === null) {
        return;
      }

      this.postorder(callback, node.left);
      this.postorder(callback, node.right);
      callback(node);
    } catch (err) {
      console.log(err);
    }
  }

  depth(value, node = this.root, height = 0) {
    if (this.find(value) === null) {
      return null;
    }

    if (value === node.data) {
      return height;
    }

    if (value < node.data) {
      return this.depth(value, node.left, height + 1)
    }

    if (value > node.data) {
      return this.depth(value, node.right, height + 1)
    }
  }

  height(value, node = this.root, height = 0, nodeFound = false) {

    if (!nodeFound) {
      node = this.find(value);
      nodeFound = true;
      if (node === null) {
        return null;
      }
    }

    if (node === null) {
      return -1;
    }

    let leftHeight = this.height(value, node.left, height, nodeFound);
    let rightHeight = this.height(value, node.right, height, nodeFound);

    return Math.max(leftHeight,rightHeight) + 1;
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }
    let leftHeight = node.left !== null ? this.height(node.left.data) : 0;
    let rightHeight = node.right !== null ? this.height(node.right.data) : 0;

    let heightDifference = Math.abs(leftHeight - rightHeight);

    if (heightDifference > 1) {
      return false;
    }

    if (!this.isBalanced(node.left) || !this.isBalanced(node.right)) {
      return false;
    }

    return true;
  }

  rebalance() {
    let arr = [];
    this.inorder((node) => {arr.push(node.data);});
    this.root = this.buildTree(arr);
  }
}

export default Tree;