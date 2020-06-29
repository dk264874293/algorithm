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
