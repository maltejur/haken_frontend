export default function TwoColView({ height, left, right }) {
  return (
    <div style={{ height }}>
      <div
        style={{
          position: "absolute",
          left: "5%",
          height,
          width: "calc(50vw - 5% - 15px)",
        }}
      >
        {left}
      </div>
      <div
        style={{
          position: "absolute",
          right: "5%",
          height,
          width: "calc(50vw - 5% - 15px)",
        }}
      >
        {right}
      </div>
    </div>
  );
}
