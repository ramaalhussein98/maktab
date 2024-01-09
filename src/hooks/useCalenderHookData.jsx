import { useState } from "react";
import { useQueryHook } from "./useQueryHook";
import myAxios from "../api/myAxios";

const initialData = [
  {
    id: 1,
    title: "aqar 1",
    units: [
      {
        unit_id: 1,
        title: "sub aqar 1",
        prices: [
          {
            price_id: 1,
            en_name: "daily",
            ar_name: "يومي",
            price: 500,
          },
          {
            price_id: 2,
            en_name: "hourly",
            ar_name: "ساعي",
            price: 160,
          },
        ],
      },
      {
        unit_id: 2,
        title: "sub aqar 2",
        prices: [
          {
            price_id: 1,
            en_name: "daily",
            ar_name: "يومي",
            price: 100,
          },
          {
            price_id: 2,
            en_name: "hourly",
            ar_name: "ساعي",
            price: 30,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "aqar 2",
    units: [
      {
        unit_id: 3,
        title: "sub aqar 3",
        prices: [
          {
            price_id: 1,
            en_name: "daily",
            ar_name: "يومي",
            price: 500,
          },
          {
            price_id: 2,
            en_name: "hourly",
            ar_name: "ساعي",
            price: 160,
          },
        ],
      },
      {
        unit_id: 4,
        title: "sub aqar 4",
        prices: [
          {
            price_id: 1,
            en_name: "daily",
            ar_name: "يومي",
            price: 100,
          },
          {
            price_id: 2,
            en_name: "hourly",
            ar_name: "ساعي",
            price: 30,
          },
        ],
      },
    ],
  },
];

const getData = async () => {
  const res = await myAxios.get("api/v1/user/calenders");
  return res.data.data;
};

const useCalenderHookData = () => {
  const { data: calendars, isLoading } = useQueryHook(["calendar"], getData);
  const [selectedMainOffice, setSelectedMainOffice] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedPriceType, setSelectedPriceType] = useState(null);
  // Function to handle the selection of a main office
  const handleSelectMainOffice = (mainOfficeId) => {
    const selectedMainOffice = initialData.find(
      (office) => office.id === mainOfficeId
    );
    setSelectedMainOffice(selectedMainOffice);
    setSelectedUnit(null);
    setSelectedPriceType(null);
  };

  // Function to handle the selection of a unit
  const handleSelectUnit = (unitId) => {
    const selectedUnit = selectedMainOffice.units.find(
      (unit) => unit.unit_id === unitId
    );
    setSelectedUnit(selectedUnit);
    setSelectedPriceType(null);
  };

  // Function to handle the selection of a price type
  const handleSelectPriceType = (priceTypeId) => {
    const selectedPriceType = selectedUnit.prices.find(
      (price) => price.price_id === priceTypeId
    );
    setSelectedPriceType(selectedPriceType);
  };

  return {
    initialData,
    selectedMainOffice,
    selectedUnit,
    selectedPriceType,
    onSelectMainOffice: handleSelectMainOffice,
    onSelectUnit: handleSelectUnit,
    onSelectPriceType: handleSelectPriceType,
  };
};

export default useCalenderHookData;
