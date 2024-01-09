import { createContext } from "react";
import { signal, useSignal } from "@preact/signals-react";
import myAxios from "../../api/myAxios";

export const AppState = createContext();

const getData = async () => {
  const res = await myAxios.get("api/v1/user/calenders");
  return res.data.data;
};

const initialData = signal(await getData());
const mainOfficeSignal = signal({});
const selectedUnit = signal({});
const priceType = signal();
const selectedPrice = signal({});
const counter = signal(0);

export const StateProvider = ({ children }) => {
  const handleSelectMainOffice = (mainOfficeId) => {
    if (mainOfficeId == 0) {
      mainOfficeSignal.value = {};
      return;
    }
    const selectedMainOffice = initialData.value.find(
      (office) => office.id == mainOfficeId
    );
    mainOfficeSignal.value = selectedMainOffice;
  };

  // Function to handle the selection of a unit
  const handleSelectUnit = (unitId) => {
    if (unitId == 0) {
      selectedUnit.value = {};
      priceType.value = [];
      return;
    }
    const Now = mainOfficeSignal.value.units.find((unit) => unit.id == unitId);
    console.log(Now);
    selectedUnit.value = Now;

    const localPrices = JSON.parse(localStorage.getItem("searchData")).type_res;

    const prices = selectedUnit.value?.ads_prices.map((ele) => {
      const price = localPrices.find((e) => e.id == ele.type_res_id);
      return price;
    });
    priceType.value = prices;
  };

  // Function to handle the selection of a price type
  const handleSelectPriceType = (priceTypeId) => {
    if (priceTypeId == 0) {
      selectedPrice.value = {};
      return;
    }
    console.log(selectedUnit.value.ads_prices);
    const selectedPriceType = selectedUnit.value.ads_prices.find(
      (price) => price.type_res_id == priceTypeId
    );
    selectedPrice.value = selectedPriceType;
  };

  const setCounter = () => {
    counter.value++;
  };

  return (
    <AppState.Provider
      value={{
        initialData,
        mainOfficeSignal,
        selectedUnit,
        priceType,
        selectedPrice,
        handleSelectMainOffice,
        handleSelectUnit,
        handleSelectPriceType,
        setCounter,
        counter,
      }}
    >
      {children}
    </AppState.Provider>
  );
};
