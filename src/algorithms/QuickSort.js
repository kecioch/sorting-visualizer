const quickSort = async (data, checkSignal, updateData) => {
  // Wrapper function for quick sort
  const quickS = async (arr, start, end) => {
    if (start < end) {
      let pi = await partition(arr, start, end);
      await quickS(arr, start, pi - 1);
      await quickS(arr, pi + 1, end);
    }
    return arr;
  };

  // Function to partition an array
  const partition = async (arr, start, end) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].status === "pivot") arr[i].status = "unselected";
    }
    let pivot = arr[end].value;
    arr[end].status = "pivot";
    let pi = start;

    for (let i = start; i < end; i++) {
      await checkSignal();
      arr[i].status = "compared";
      arr[pi].status = "compared";
      await updateData(arr);
      if (arr[i].value < pivot) {
        [arr[i], arr[pi]] = [arr[pi], arr[i]];
        arr[i].status = "swap";
        arr[pi].status = "swap";
        await updateData(arr);
        arr[i].status = "unselected";
        arr[pi].status = "unselected";
        pi++;
      }
      arr[i].status = "unselected";
      arr[pi].status = "unselected";
    }

    [arr[end], arr[pi]] = [arr[pi], arr[end]];
    arr[pi].status = "sorted";
    await updateData(arr);

    return pi;
  };

  // Run Quick Sort
  const sorted = await quickS(data, 0, data.length - 1);
  
  // Set the status to sorted for all remaining elements
  for (let i = 0; i < sorted.length; i++) {
    await checkSignal();
    sorted[i].status = "sorted";
    await updateData(sorted);
  }
  await updateData(sorted);
};

export default quickSort;
