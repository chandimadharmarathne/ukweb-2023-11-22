import { ExpandMore } from "@mui/icons-material";
import { Box, Button, Collapse, Menu, MenuItem, Stack } from "@mui/material";
import React, { FC, useMemo, useRef, useState } from "react";
import { Lang, languages } from "../constants/languages";
import { useLanguage } from "../store/providers/lang.provider";
import { useMobile } from "../store/providers/mobile-to-desktop-change.provider";
import { Languages } from "../utils/icons";

interface LanguageSelectorProps {}

const LanguageSelector: FC<LanguageSelectorProps> = () => {
  const { code, update } = useLanguage();

  const activeLang = useMemo(
    () => languages.find((lang) => lang.code === code),
    [code]
  );

  const button = useRef(null);
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const isMobile = useMobile();
  const updateLang = (code: Lang["code"]) => {
    update?.(code);
    toggleMenu();
  };
  return (
    <Box>
      <Button
        ref={button}
        onClick={toggleMenu}
        color={"primary"}
        startIcon={<Languages />}
        endIcon={<ExpandMore />}
      >
        {activeLang?.text}
      </Button>
      {isMobile ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {languages.map((lang) => (
            <Language key={lang.code} lang={lang} onClick={updateLang} />
          ))}
        </Collapse>
      ) : (
        <Menu
          open={open}
          elevation={1}
          onClose={toggleMenu}
          anchorEl={button.current}
        >
          {languages.map((lang) => (
            <Language key={lang.code} lang={lang} onClick={updateLang} />
          ))}
        </Menu>
      )}
    </Box>
  );
};

interface LangProps {
  lang: Lang;
  onClick: (code: Lang["code"]) => void;
}
const Language: FC<LangProps> = ({ lang, onClick }) => (
  <MenuItem onClick={() => onClick(lang.code)}>
    <Stack width="100%" spacing={1} direction="row">
      <Box
        color={(theme) => theme.palette.primary.main}
        fontWeight="700"
        style={{ minWidth: 25 }}
      >
        {lang.icon}
      </Box>
      <div>{lang.text}</div>
    </Stack>
  </MenuItem>
);

export default LanguageSelector;
