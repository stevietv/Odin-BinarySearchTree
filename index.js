import Tree from "./tree.js";

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(testArr);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(tree.root);

console.log("-------- Insert two values 99 + 9999 --------")

tree.insert(99);
tree.insert(9999);
prettyPrint(tree.root);

console.log("-------- Delete 67 and 8 --------")
tree.delete(67);
tree.delete(8);
prettyPrint(tree.root);

console.log("-------- Find node 9 --------")
console.log(tree.find(9));

console.log("-------- log breadth first level order --------")
let arr = []
tree.levelOrderForEach((node) => { arr.push(node.data) });
console.log([...arr]);

console.log("-------- log depth first preorder --------")
arr = [];
tree.preorder((node) => { arr.push(node.data) });
console.log([...arr]);

console.log("-------- log depth first inorder --------")
arr = [];
tree.inorder((node) => { arr.push(node.data) });
console.log([...arr]);


console.log("-------- log depth first postorder --------")
arr = [];
tree.postorder((node) => { arr.push(node.data) });
console.log([...arr]);


console.log("-------- log depth of 6345 --------")
console.log(tree.depth(6345));

console.log("-------- log height of 99 --------")
console.log(tree.height(99));

console.log("-------- check if balanced, rebalance and check again --------")
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

console.log("")
console.log("-------- REQUIRED CHECKS WITH RANDOM TREE --------")
console.log("")

let randomTree = new Tree(Array.from({length: 20}, () => Math.floor(Math.random() * 100)));
prettyPrint(randomTree.root);
console.log(`The randomTree is balanced: ${randomTree.isBalanced()}`);
let levelOrder = "";
let preOrder = "";
let postOrder = "";
let inOrder = "";
randomTree.levelOrderForEach((node) => { levelOrder += `${node.data}, ` });
randomTree.preorder((node) => { preOrder += `${node.data}, ` });
randomTree.postorder((node) => { postOrder += `${node.data}, ` });
randomTree.inorder((node) => { inOrder += `${node.data}, ` });
console.log(`levelOrder = ${levelOrder}`);
console.log(`preOrder = ${preOrder}`);
console.log(`postOrder = ${postOrder}`);
console.log(`inOrder = ${inOrder}`);
randomTree.insert(150);
randomTree.insert(175);
randomTree.insert(200);
randomTree.insert(275);
console.log(`The randomTree is balanced: ${randomTree.isBalanced()}`);
randomTree.rebalance();
console.log(`The randomTree is balanced: ${randomTree.isBalanced()}`);
levelOrder = "";
preOrder = "";
postOrder = "";
inOrder = "";
randomTree.levelOrderForEach((node) => { levelOrder += `${node.data}, ` });
randomTree.preorder((node) => { preOrder += `${node.data}, ` });
randomTree.postorder((node) => { postOrder += `${node.data}, ` });
randomTree.inorder((node) => { inOrder += `${node.data}, ` });
console.log(`levelOrder = ${levelOrder}`);
console.log(`preOrder = ${preOrder}`);
console.log(`postOrder = ${postOrder}`);
console.log(`inOrder = ${inOrder}`);

