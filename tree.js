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

    rootNode.left = this.buildTree(array,  start,  mid-1, sorted);
    rootNode.right = this.buildTree(array,  mid+1,  end, sorted);

    return rootNode;
  }

  insert(value, node = this.root) {
    if (node === null)
      return new Node(value);

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    }
    else if (value > node.data) {
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
    }
    else if (value > node.data) {
      node.right = this.delete(value, node.right);
    }
    else {

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
}

export default Tree;