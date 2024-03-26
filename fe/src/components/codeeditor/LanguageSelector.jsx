import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { LANGUAGES } from "./constants";

const languages = Object.entries(LANGUAGES);

const LanguageSelector = ({ language, onSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {language}
      </Button>
      <Menu isLazy
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {languages.map(([language]) => (
          <MenuItem
            key={language}
            onClick={() => {
              handleClose();
              onSelect(language);
            }}
          >
            {language}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default LanguageSelector;
