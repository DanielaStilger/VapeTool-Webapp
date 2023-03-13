import { createStyles } from 'antd-style';

export default createStyles(({ token }) => ({
  property: {
    display: "flex",
    flexWrap: "nowrap",
    marginBottom: "16px",
    lineHeight: "22px",
    ".label,  .value": { flex: "1 1 50%" },
  },
  label: { maxWidth: "100px", marginRight: "8px", textAlign: "right" },
  value: {
    marginTop: "4px",
    lineHeight: "14px",
    textAlign: "left",
  },
  number: {
    display: "inline-block",
    width: "50px",
    textAlign: "right",
  },
  editable: {
    borderBottom: "1px #dedede dashed",
    cursor: "pointer",
    "&:hover": { borderBottomColor: "#999" }
  },
  unit: { display: "inline-block", marginLeft: "4px" },
  confirmBtn: { marginLeft: "12px" },
  isEditing: { marginTop: "-4px" },
  proOnly: { marginTop: "0" },
}));