import { createContext, useEffect, useState } from "react";
import myAxios from "../../api/myAxios";
import { initial } from "lodash";

export const CalendarContext = createContext();
const getData = async () => {
  const res = await myAxios.get("api/v1/user/calenders");
  return res.data.data;
};

export const CalendarProvider = ({ children }) => {
  const [initialData, setInitialData] = useState();
  useEffect(() => {
    const getData1 = async () => {
      const data = await getData();

      data && setInitialData(data);
    };
    getData1();
  }, []);
  console.log(initialData);
  const [mainOffice, setmainOffice] = useState({});
  const [selectedUnit, setSelectedUnit] = useState({});
  const [priceType, setPriceType] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState({});
  const [selectedStartTime, setSelectedStartTime] = useState();
  const [selectedEndTime, setSelectedEndTime] = useState();

  const handleSelectMainOffice = (mainOfficeId) => {
    if (mainOfficeId == 0) {
      setmainOffice({});
      return;
    }
    const selectedMainOffice = initialData.find(
      (office) => office.id == mainOfficeId
    );
    setmainOffice(selectedMainOffice);
  };

  const handleSelectUnit = (unitId) => {
    if (unitId == 0) {
      setSelectedUnit({});
      setPriceType([]);
      return;
    }
    const Now = mainOffice.units.find((unit) => unit.id == unitId);
    setSelectedUnit(Now);

    const localPrices = JSON.parse(localStorage.getItem("searchData")).type_res;

    const prices = Now?.ads_prices.map((ele) => {
      const price = localPrices.find((e) => e.id == ele.type_res_id);
      return price;
    });
    setPriceType(prices);
  };

  const handleSelectPriceType = (priceTypeId) => {
    console.log(priceTypeId);
    if (priceTypeId == 0) {
      setSelectedPrice({});
      return;
    }

    const selectedPriceType = selectedUnit.ads_prices.find(
      (price) => price.type_res_id == priceTypeId
    );

    console.log(selectedPriceType);
    setSelectedPrice(selectedPriceType);
  };
  console.log(selectedStartTime?.$d?.getHours());
  return (
    <CalendarContext.Provider
      value={{
        initialData,
        mainOffice,
        selectedUnit,
        priceType,
        selectedPrice,
        selectedEndTime,
        selectedStartTime,
        setSelectedEndTime,
        setSelectedStartTime,
        handleSelectMainOffice,
        handleSelectPriceType,
        handleSelectUnit,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
