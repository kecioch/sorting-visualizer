const bubbleSort = async (data, checkSignal, updateData) => {
  const n = data.length;
  for (let y = n - 1; y >= 0; y--) {
    for (let i = 0; i <= y - 1; i++) {
      const j = i + 1;
      checkSignal();
      data[i].status = "compared";
      data[j].status = "compared";
      await updateData(data);
      if (data[i].value > data[j].value) {
        const temp = data[j].value;
        data[j].value = data[i].value;
        data[i].value = temp;
        data[i].status = "swap";
        data[j].status = "swap";
        await updateData(data);
      }
      data[i].status = "unselected";
      data[j].status = "unselected";
    }
    data[y].status = "sorted";
  }
};

export default bubbleSort;
