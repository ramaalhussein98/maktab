import { useState } from "react";
import { useTranslation } from "react-i18next";
import OfficeBoxNumbers from "./OfficeBoxNumbers";
import "../../../../assets/css/office_details.css";
import {
  Box,
  Switch,
  Button,
  Typography,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--green-color)",
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--green-color)",
  },
}));

const UnitRoomDetails = ({ details }) => {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState([...details]);
  const lang = i18n.language;
  console.log(state);

  const handleChange = (ar_name, en_name, value) => {
    console.log(ar_name, en_name, value);
    const existingObjectIndex = state.findIndex(
      (obj) => obj.en_name === en_name
    );

    if (existingObjectIndex !== -1) {
      // If the object with the same en_name exists, update its values
      const updatedDetails = state.map((obj, index) => {
        if (index === existingObjectIndex) {
          return {
            ...obj,
            number_details: value,
          };
        }
        return obj;
      });

      setState(updatedDetails);
    } else {
      // If the object with the same en_name doesn't exist, add it
      setState([
        ...state,
        {
          ar_name: ar_name,
          en_name: en_name,
          number_details: value,
        },
      ]);
    }
  };
  const values = [
    {
      en_name: "floors",
      ar_name: "الدور",
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      en_name: "office Age",
      ar_name: "عمر العقار",
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      en_name: "offices numbers",
      ar_name: "عدد المكاتب",
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      en_name: "Meeting Rooms",
      ar_name: "غرف الاجتماعات",
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  ];
  const handlePropertyClick = (propertyId) => {
    // dispatch({ type: "facilities", value: propertyId });
  };
  return (
    <>
      <div className="flex gap-6 flex-col my-6">
        {values.map((ele, i) => (
          <div key={i} className="flex items-center  justify-evenly gap-4">
            <label className="w-1/3" htmlFor="">
              {lang === "ar" ? ele.ar_name : ele.en_name}
            </label>
            <select
              className="outline-none border-transparent w-1/2 shadow rounded-lg py-2 px-4"
              name=""
              onChange={(e) =>
                handleChange(ele.ar_name, ele.en_name, e.target.value)
              }
              id=""
            >
              {ele.values.map((number) => (
                <option
                  selected={
                    details?.find(
                      (e) =>
                        e.en_name.toLowerCase() === ele.en_name.toLowerCase()
                    )?.number_details == number
                  }
                  key={number}
                  value={number}
                >
                  {number}
                </option>
              ))}
            </select>
            {/* <FormControl
              sx={{ minWidth: 120, width: "200px", backgroundColor: "white" }}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) =>
                  handleChange(ele.ar_name, ele.en_name, e.target.value)
                }
                displayEmpty
                MenuProps={{
                  getContentAnchorEl: null,
                }}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected) {
                    return selected;
                  }
                  return <em>اضغط لاختيار المكتب</em>;
                }}
              >
                {ele.values?.map((ele, i) => {
                  console.log(ele);
                  return (
                    <MenuItem key={i} value={ele}>
                      {ele}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl> */}
          </div>
        ))}
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "1rem ",
          marginInline: "auto",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        <Button
          // onClick={handleSubmit}
          type="submit"
          sx={{
            fontWeight: "600",
            borderRadius: "8px",
            minWidth: "186px",
            padding: "0.75rem 2.5rem",
            height: "50px",
            backgroundColor: "var(--main-color)",
            color: "white",
            "&:hover": {
              backgroundColor: "#0b7b5a",
              color: "white",
            },
          }}
        >
          {t("dashboard.outgoing_requests.submit_btn")}
        </Button>
        <Button
          sx={{
            fontWeight: "600",
            borderRadius: "8px",

            border: "1px solid var(--main-color)",
            minWidth: "186px",
            padding: "0.75rem 2.5rem",
            height: "50px",
            backgroundColor: "white",
            color: "var(--main-color)",
            "&:hover": {
              backgroundColor: "#e5f9f4",
            },
          }}
          // onClick={onCancel}
        >
          {t("dashboard.outgoing_requests.cancel_btn")}
        </Button>
      </Box>
    </>
  );
};

export default UnitRoomDetails;
