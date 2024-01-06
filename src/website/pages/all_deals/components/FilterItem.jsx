import { Box, Paper } from "@mui/material";

const FilterItem = ({
  title,
  description,
  onClick,
  isOpen,
  menuItems,
  selectedValue,
  handleMenuItemClick,
}) => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box className="d_flex_col" onClick={onClick}>
        <span className="font_bold_purble">{title}</span>

        <span className="font_gray">
          {selectedValue !== undefined && selectedValue !== ""
            ? selectedValue
            : description}
        </span>
      </Box>
      {isOpen && (
        <Paper elevation={3} className="paperContainer">
          {menuItems.map((item, index) => (
            <p
              id={item.id}
              key={index}
              className="menuSelect"
              onClick={() => handleMenuItemClick(item)}
            >
              {Array.isArray(item) ? item.join(" - ") : item.ar_name}
            </p>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default FilterItem;
