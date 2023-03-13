import { createStyles } from 'antd-style';

export default createStyles(() => ({
  input: { width: "100px" },
  labeledInput: {
    display: "inline-block",
    label: {
      display: "block",
      marginBottom: "4px",
      marginLeft: "2px",
      fontSize: "12px",
      textAlign: "left"
    }
  },
  nominator: { zIndex: 2, width: "60px", position: "absolute", top: "12px", left: "0" },
  denominator: { zIndex: 2, width: "60px", position: "absolute", top: "68px", left: "80px" },
  fraction: {
    position: "relative",
    display: "inline-block",
    width: "140px",
    height: "120px"
  },
  line: {
    position: "absolute",
    top: "0",
    left: "10px",
    zIndex: 1,
    fontSize: "120px",
    transform: "rotate(-60deg)"
  },
  inchesInput: { paddingTop: "20px" },
  swapSign: { paddingTop: "20px", fontSize: "40px" },
  equalSign: {
    marginTop: "40px",
    fontSize: "40px",
    transform: "rotate(90deg)"
  },
  "@media (min-width: @screen-lg) and (max-width: @screen-xl - 1px)": {
    ".swapSign": { margin: "20px 0", padding: "0", transform: "rotate(90deg)" },
    ".equalSign": { margin: "20px 0", transform: "none" },
    ".inchesInput": { paddingTop: "0" }
  },
  "@media (min-width: @screen-xl) and (max-width: @screen-xxl - 1px)": {
    ".swapSign": { paddingTop: "30px", fontSize: "25px" },
    ".equalSign": { marginTop: "45px", fontSize: "25px" }
  }
}));