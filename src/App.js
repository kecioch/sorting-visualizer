import React, { useCallback, useEffect, useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import SortingChart from "./components/sorting-chart/SortingChart";
import AlgorithmsController from "./algorithms/AlgorithmsController";
import InfoModal from "./components/modals/InfoModal";
import SettingsModal from "./components/modals/SettingsModal";
import { randomIntFromInterval } from "./utilities/Random";
import StopWatch from "./components/stopwatch/StopWatch";

function App() {
  const [data, setData] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [algoController] = useState(new AlgorithmsController(setData));

  const headerOptions = {
    delay: {
      startIndex: 5,
      values: [0, 1, 5, 25, 50, 100, 250, 500, 750, 1000, 2000],
    },
    size: {
      startIndex: 1,
      values: [5, 10, 20, 50, 70, 100, 200, 300, 400, 500],
    },
    algorithms: {
      startIndex: 0,
      values: algoController.names,
    },
  };

  const [config, setConfig] = useState({
    sorting: false,
    algorithm:
      headerOptions.algorithms.values[headerOptions.algorithms.startIndex],
    size: headerOptions.size.values[headerOptions.size.startIndex],
    delay: headerOptions.delay.values[headerOptions.delay.startIndex],
  });

  const onCloseInfo = () => {
    setShowInfo(false);
  };

  const onOpenInfo = () => {
    setShowInfo(true);
  };

  const onOpenSettings = () => {
    setShowSettings(true);
  };

  const onCloseSettings = () => {
    setShowSettings(false);
  };

  const onRandomize = useCallback(() => {
    const newData = [];
    for (let i = 0; i < config.size; i++) {
      newData.push({
        value: randomIntFromInterval(1, 100),
        status: "unselected",
      });
    }
    setData(newData);
  }, [config.size]);

  const onChangeSize = (val) => {
    setConfig((config) => ({
      ...config,
      size: val,
    }));
  };

  const onChangeDelay = (val) => {
    setConfig((config) => ({
      ...config,
      delay: val,
    }));
    algoController.setDelay(val);
  };

  const onChangeAlgorithm = (val) => {
    setConfig((config) => ({
      ...config,
      algorithm: val,
    }));
  };

  const onStart = async () => {
    setConfig((config) => ({
      ...config,
      sorting: true,
    }));

    setData(data.map((el) => (el.status = "unselected")));
    algoController.setDelay(config.delay);

    switch (config.algorithm.toLowerCase()) {
      case "selection sort":
        await algoController.selectionSort(data);
        break;
      case "bubble sort":
        await algoController.bubbleSort(data);
        break;
      case "quick sort":
        await algoController.quickSort(data);
        break;
      case "merge sort":
        await algoController.mergeSort(data);
        break;
      default:
        break;
    }

    setConfig((config) => ({
      ...config,
      sorting: false,
    }));
  };

  const onStop = () => {
    algoController.stop();
    setConfig((config) => ({
      ...config,
      sorting: false,
    }));
  };

  useEffect(() => {
    onRandomize();
  }, [config.size, onRandomize]);

  return (
    <React.Fragment>
      <div className="box">
        {showInfo && <InfoModal onClose={onCloseInfo} />}
        {showSettings && <SettingsModal onClose={onCloseSettings} />}
        <Header
          options={headerOptions}
          config={config}
          onRandomize={onRandomize}
          onChangeSize={onChangeSize}
          onChangeDelay={onChangeDelay}
          onChangeAlgorithm={onChangeAlgorithm}
          onStart={onStart}
          onStop={onStop}
          onOpenInfo={onOpenInfo}
          onOpenSettings={onOpenSettings}
        />
        <SortingChart data={data} isSorting={config.sorting} />
        <div className="d-flex flex-row justify-content-center">
          <StopWatch isRunning={config.sorting} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
