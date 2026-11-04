class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.count = 0;
  }

  insert(value) {
    const newNode = new BSTNode(value);
    this.count++;
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return;
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  contains(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  inOrderTraversal(callback) {
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      callback(node.value);
      traverse(node.right);
    }
    traverse(this.root);
  }
}

module.exports = { version: "mod_mw2c2u7j_ftgb", BinarySearchTree };
