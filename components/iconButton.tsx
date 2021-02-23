import classes from "styles/iconButton.module.css";

export default function IconButton({ children, onClick = () => {} }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        marginLeft: 20,
      }}
      className="blackOnHover"
    >
      {children}
    </div>
  );
}
