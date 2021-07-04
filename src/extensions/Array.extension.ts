declare global {
  interface Array<T> {
    shuffle(): Array<T>;
  }
}

/**
 * Shuffles an Array in-place. This method mutates the array and returns a reference to the same array.
 *  
 * @returns Returns a reference to the same array.
 */
Array.prototype.shuffle = function(): any[] {
  for (let i = this.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};

export {};