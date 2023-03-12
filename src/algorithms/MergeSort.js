const mergeSort = async (data, checkSignal, updateData) => {
  // Wrapper function for merge sort
  async function mergeS(array, start = 0, end = array.length - 1) {
    if (start >= end) {
      return;
    }

    const mid = Math.floor((start + end) / 2);
    await mergeS(array, start, mid);
    await mergeS(array, mid + 1, end);
    return await merge(array, start, mid, end);
  }

  // Function to merge the subarrays
  async function merge(array, start, mid, end) {
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);
    let leftIndex = 0;
    let rightIndex = 0;
    let arrayIndex = start;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      await checkSignal();
      array[arrayIndex].status = "compared";
      await updateData(array);

      if (leftArray[leftIndex].value <= rightArray[rightIndex].value) {
        array[arrayIndex] = leftArray[leftIndex];
        leftIndex++;
      } else {
        array[arrayIndex] = rightArray[rightIndex];
        rightIndex++;
      }

      array[arrayIndex].status = "swap";
      await updateData(array);

      array[arrayIndex].status = "compared";
      await updateData(array);

      arrayIndex++;
    }

    // Copy any remaining elements of the left or right array
    while (leftIndex < leftArray.length) {
      await checkSignal();
      array[arrayIndex].status = "compared";
      await updateData(array);
      array[arrayIndex] = leftArray[leftIndex];
      await updateData(array);
      leftIndex++;
      arrayIndex++;
    }

    while (rightIndex < rightArray.length) {
      await checkSignal();
      array[arrayIndex].status = "compared";
      await updateData(array);
      array[arrayIndex] = rightArray[rightIndex];
      await updateData(array);
      rightIndex++;
      arrayIndex++;
    }

    // Mark the sorted elements
    for (let i = start; i <= end; i++) {
      array[i].status = "unselected";
    }
    await updateData(array);
    return array;
  }

  // Run Merge Sort
  const sorted = await mergeS(data, 0, data.length - 1);

  // Set the status to sorted for all remaining elements
  for (let i = 0; i < sorted.length; i++) {
    await checkSignal();
    sorted[i].status = "sorted";
    await updateData(sorted);
  }
  await updateData(sorted);
};
export default mergeSort;