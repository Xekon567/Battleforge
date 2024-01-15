import React from "react";

export const Dropdown = (props: any) => {
  const { children } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [anchorElement, setAnchorElement] = React.useState(null);
  const handleClose = () => {
    setIsOpen(false);
    setAnchorElement(null);
  }
  const handleOpen = (event: any) => {
    setIsOpen(true);
    if (event) {
      setAnchorElement(event.currentTarget);
    }
  }
  if (!children || !(typeof children === 'function')) {
    return <></>;
  }
  return (
    <>
      {children({
        open: isOpen,
        handleClose,
        handleOpen,
        anchorElement
      })}
    </>
  );
};
