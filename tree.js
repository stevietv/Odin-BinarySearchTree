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
}

export default Tree;