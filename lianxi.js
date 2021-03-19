/*function ArrayList(){
  this.array = []

  ArrayList.prototype.insert = function(item){
    this.array.push(item)
  }

  ArrayList.prototype.swap = function (m, n) {
    var temp = this.array[m]
    this.array[m] = this.array[n]
    this.array[n] = temp
  }

  ArrayList.prototype.median = function (left, right) {
    // 1.求出中间的位置
    var center = Math.floor((left + right) / 2)
    // 2.判断并且进行交换
    if (this.array[left] > this.array[center]) {
      this.swap(left, center)
    }
    if (this.array[center] > this.array[right]) {
      this.swap(center, right)
    }
    if (this.array[left] > this.array[right]) {
      this.swap(left, right)
    }
    // 3.巧妙的操作: 将center移动到right - 1的位置.
    this.swap(center, right - 1)
    // 4.返回pivot
    return this.array[right - 1]
  }
}

// 测试
/!*var list = new ArrayList()
list.insert(3)
list.insert(6)
list.insert(4)
list.insert(2)
list.insert(11)
list.insert(10)
list.insert(5)
list.shellSort()
console.log(list)    // 2,3,4,5,6,10,11*!/

var list = new ArrayList()
list.insert(2)
list.insert(3)
list.insert(17)
list.insert(26)
list.insert(24)
list.insert(5)
list.insert(25)
var pivot = list.median(0, 6) // left:6 right:5 center:2
console.log(pivot) // pivot:5
console.log(list)*/


/*function quickSort(arr, left, right){
  if(left >= right) {return}   // 如果左边的索引大于等于右边的索引说明整理完毕
  var baseVal = arr[right], // 取无序数组最后一个数为基准值
    i = left,
    j = right;
  while (i < j) {
    // 把所有比基准值小的数放在左边，比基准值大的数放在右边
    while (i < j && arr[i] < baseVal) {
      // 找到一个比基准值大的数交换
      i++;
    }
    arr[j] = arr[i]; // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
    while (j > i && arr[j] > baseVal) {
      // 找到一个比基准值小的数交换
      j--;
    }
    arr[i] = arr[j]; // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
  }
  arr[j] = baseVal; // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
  //console.log(arr)
  quickSort(arr, left, j - 1); // 将左边的无序数组重复上面的操作
  quickSort(arr, j + 1, right); // 将右边的无序数组重复上面的操作
  return arr;
}*/

/*function quickSort(arr, left = 0, right = arr.length - 1) {
  if(left > right) return
  var baseValue= arr[parseInt((left+right)/2)]
  var i = left
  var j = right
  while(i<j){
    while(i<j && arr[i]<baseValue){
        i++
    }
    while(i<j && arr[j]>baseValue){
      j--
    }
    if(i>=j){
      break
    }
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  quickSort(arr,left,i-1)
  quickSort(arr,i+1,right)
  return arr
}*/

/*function mergeSort(arr) {
  // 采用自上而下的递归方法
  var length = arr.length

  if(length<2){
    return arr
  } else{
    var middle = Math.floor(length/2)
    var left = arr.slice(0,middle)
    var right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
  }
}
function merge(left,right){
  var result = []
  while(left.length && right.length)
  if(left[0]<=right[0]){
    result.push(left.shift())
  }else{
    result.push(right.shift())
  }
  while(left.length) result.push(left.shift())
  while(right.length) result.push(right.shift())
  return result
}


var list = [3,7,11,9,10,1,12,4,8,6]
console.log(mergeSort(list))*/

let dat = [5, 8, 10, 3, 2, 18, 17, 9];
//生成大顶堆
function adjustHeap(arr, i, len) {
  var temp = arr[i];
  //从i结点的左子结点开始，也就是2i+1处开始
  for (var j = 2 * i + 1; j < len; j = 2 * j + 1) {
    //如果左子结点小于右子结点，j指向右子结点
    if (j + 1 < len && arr[j] < arr[j + 1]) {
      j++;
    }
    //如果子节点大于父节点，将子节点值赋给父节点（不用进行交换）值和索引都赋值
    if (arr[j] > arr[i]) {
      [arr[i],arr[j]] = [arr[j],arr[i]];
      i = j;
    } else {
      break;
    }
  }
}
function heapSort(data) {
  //构造大顶堆
  //此时我们从最后一个非叶子结点开始,叶结点自然不用调整
  ////从第一个非叶子结点从下至上，从右至左调整结构
  for(var i=data.length/2-1; i>=0; i--){
    adjustHeap(data, i, data.length)
  }
  console.log(data)
  for(var j=data.length-1; j>0; j--){
    [data[0], data[j]] = [data[j],data[0]]
    adjustHeap(data, 0, j)
    console.log(data)
  }
  return data;
}

var sortedData = heapSort(dat);
console.log(sortedData);
