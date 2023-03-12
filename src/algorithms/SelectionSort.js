const selectionSort = async (data, checkSignal, updateData) => {
  const n = data.length;

  for (let i = 0; i < n - 1; i++) {
    await checkSignal();
    let minIndex = i;
    if (i > 0) data[i - 1].status = "sorted";
    data[i].status = "compared";

    for (let j = i + 1; j < n; j++) {
      await checkSignal();

      if (data[j].value < data[minIndex].value) minIndex = j;

      data[j].status = "compared";
      if (j > i + 1) data[j - 1].status = "unselected";
      await updateData(data);
    }
    data[n - 1].status = "unselected";

    if (minIndex !== i) {
      data[i].status = "swap";
      data[minIndex].status = "swap";
      await updateData(data);

      // Swap elements at i and minIndex
      const temp = data[i].value;
      data[i].value = data[minIndex].value;
      data[minIndex].value = temp;
      data[i].status = "unselected";
      data[minIndex].status = "unselected";
    }
  }

  data[n - 2].status = "sorted";
  data[n - 1].status = "sorted";
  await updateData(data);
};

export default selectionSort;
