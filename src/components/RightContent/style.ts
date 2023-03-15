import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
  menu: {
    ":global(.anticon)": {
      marginRight: "8px"
    },
    ":global(.ant-dropdown-menu-item)": {
      minWidth: "160px"
    }
  },
  name: {
    display: "none"
  },
  "@media only screen and (max-width: @screen-md)": {
    ":global(.ant-divider-vertical)": {
      verticalAlign: "unset"
    },
    ".right": {
      position: "absolute",
      top: "0",
      right: "12px",
      ".account": {
        ".avatar": {
          marginRight: "0"
        }
      },
      ".search": {
        display: "none"
      }
    }
  },
  action: {
    display: "flex",
    alignItems: "center",
    height: "48px",
    padding: "0 12px",
    cursor: "pointer",
    transition: "all 0.3s",
    "&:hover": {
      background: "@pro-header-hover-bg"
    },
    "&:global(.opened)": {
      background: "@pro-header-hover-bg"
    }
  },
  right: {
    display: "flex",
    cssFloat: "right",
    height: "48px",
    marginLeft: "auto",
    overflow: "hidden",
    search: {
      padding: "0 12px",
      "&:hover": {
        background: "transparent"
      }
    },
  },
  avatar: {
    marginRight: "8px",
    color: "@primary-color",
    verticalAlign: "top",
    background: "rgba(255, 255, 255, 0.85)"
  },
  dark: {
    action: {
      "&:hover": {
        background: "#252a3d"
      },
      "&:global(.opened)": {
        background: "#252a3d"
      }
    }
  },
}));