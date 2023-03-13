import { createStyles } from 'antd-style';

export default createStyles(() => ({
  card: {

    position: "relative",
    marginLeft: "75px",
    border: "1px solid #e8e8e8",
    "@media (max-width: @screen-lg)": {
      marginTop: "75px",
      marginLeft: "0",
      textAlign: "center"
    }
  },
  divider: {
    margin: "12px 0"
  },
  avatarHolder: {
    position: "absolute",
    top: "calc(50% - 75px)",
    left: "-75px",
    "@media (max-width: @screen-lg)": {
      top: "-75px",
      left: "calc(50% - 75px)"
    },
    img: {
      border: "2px @background-color-base solid", borderRadius: "50%"
    }
  },
  content: {
    marginLeft: "75px",
    "@media (max-width: @screen-lg)": {
      marginTop: "60px", marginLeft: "0"
    },
  },
  buttons: {
    paddingLeft: "12px",
    textAlign: "center",
    "& > a,\n    button": {
      display: "block",
      width: "152px",
      margin: "0 auto 12px"
    }

    ,
    "@media (max-width: @screen-lg)": {
      "&": {
        paddingTop: "12px", paddingLeft: "0"
      }

      ,
      "& > a,\n      button": {
        display: "inline-block", margin: "0 12px"
      }
    }
  },
  name: {
    display: "inline-block",
    boxSizing: "inherit",
    marginBottom: "4px",
    color: "@heading-color",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "28px"
  },
  tagsTitle: {
    marginRight: "8px",
    "@media (max-width: @screen-lg)": {
      "&": {
        display: "block", marginRight: "0", marginBottom: "8px"
      }
    }
  },
  infoGroup: {
    flex: "0 0 100px",
    padding: "4px 12px",
  },
  value: {
    marginRight: "4px", fontWeight: "bold", fontSize: "30px"
  },
  label: {
    fontSize: "12px", textTransform: "uppercase"
  },
  infos: {
    display: "flex",
    "@media (max-width: @screen-lg)": {
      "&": {
        justifyContent: "center"
      }
    },
  }
}));