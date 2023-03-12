import sleep from "../utilities/Sleep";
import selectionSort from "./SelectionSort";
import bubbleSort from "./BubbleSort";
import mergeSort from "./MergeSort";
import quickSort from "./QuickSort";

class AlgorithmsController {
  constructor(setData) {
    this.abortController = new AbortController();
    this.signal = this.abortController.signal;
    this.names = ["Selection Sort", "Bubble Sort", "Quick Sort", "Merge Sort"];
    this.setData = setData;
  }

  getNames() {
    return this.names;
  }

  stop() {
    this.abortController.abort();
  }

  setDelay(val) {
    this.delay = val;
  }

  initAbortController() {
    this.abortController = new AbortController();
    this.signal = this.abortController.signal;
  }

  checkSignal() {
    if (this.signal.aborted) {
      throw new DOMException("AbortError", "AbortError");
    }
  }

  async updateData(data) {
    if (this.delay > 0) {
      this.setData([...data]);
      try {
        await sleep(this.delay, this.signal);
      } catch (ex) {
        throw ex;
      }
    }
  }

  async selectionSort(data) {
    try {
      this.initAbortController();
      await selectionSort(
        data,
        this.checkSignal.bind(this),
        this.updateData.bind(this)
      );
      this.setData([...data]);
    } catch {}
  }

  async bubbleSort(data) {
    try {
      this.initAbortController();
      await bubbleSort(
        data,
        this.checkSignal.bind(this),
        this.updateData.bind(this)
      );
      this.setData([...data]);
    } catch {}
  }

  async mergeSort(data) {
    try {
      this.initAbortController();
      await mergeSort(
        data,
        this.checkSignal.bind(this),
        this.updateData.bind(this)
      );
      this.setData([...data]);
    } catch {}
  }

  async quickSort(data) {
    try {
      this.initAbortController();
      await quickSort(
        data,
        this.checkSignal.bind(this),
        this.updateData.bind(this)
      );
      this.setData([...data]);
    } catch {}
  }
}

export default AlgorithmsController;
