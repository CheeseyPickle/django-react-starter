import React from "react";

function parseXarrayString(raw) {
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // ---- Size ----
  const size = (raw.match(/Size:\s*([^\n]+)/)?.[1] || "").trim();

  // ---- Dimensions ----
  // Robustly grab key:value pairs even if commas are missing
  const dimLine = lines.find(l => l.startsWith("Dimensions:")) || "";
  const dimPairs = {};
  const dimRegex = /([A-Za-z_]+)\s*:\s*(\d+)/g;
  let m;
  while ((m = dimRegex.exec(dimLine)) !== null) {
    dimPairs[m[1]] = m[2];
  }
  // Order explicitly
  const order = ["time", "latitude", "longitude"];
  const dimNamesLine = order.filter(k => dimPairs[k]).join("  x  ");
  const dimValuesLine = order.filter(k => dimPairs[k]).map(k => dimPairs[k]).join("   x   ");

  // ---- Coordinates ----
  const coordLines = lines.filter(l => l.startsWith("*"));
  const coords = coordLines.map(formatCoord);

  // ---- Selected variable range ----
  const dataVarsIdx = lines.findIndex(l => l.startsWith("Data variables:"));
  let variableRange = null;
  if (dataVarsIdx !== -1) {
    // Take the first data variable line with a float dtype
    const after = lines.slice(dataVarsIdx + 1).filter(l => l && !l.startsWith("*"));
    const varLine = after.find(l => /\)\s*float/i.test(l)) || after[0];
    if (varLine) variableRange = parseVariableRange(varLine);
  } else {
    const varLine = lines.find(l => /\(time.*\)\s*float/i.test(l));
    if (varLine) variableRange = parseVariableRange(varLine);
  }

  return { size, dimNamesLine, dimValuesLine, coords, variableRange };
}

function formatCoord(line) {
  // Example:
  // * longitude  (longitude) float32 256B -73.62 -72.62 ... -11.62 -10.62
  // * time       (time) datetime64[ns] 32B 2020-12-31 2021-12-31 ... 2023-12-31
  const trimmed = line.trim();
  const name = trimmed.replace(/^\*\s*/, "").split(/\s+/)[0];

  // Everything after the byte-size token (e.g., "256B ", "32B ")
  let tail = trimmed;
  const bIdx = trimmed.lastIndexOf("B ");
  if (bIdx !== -1) tail = trimmed.slice(bIdx + 2).trim();
  else {
    // Fallback: after last ')'
    const pIdx = trimmed.lastIndexOf(")");
    tail = pIdx !== -1 ? trimmed.slice(pIdx + 1).trim() : trimmed;
  }

  // Time uses dates; others use floats
  if (/datetime/i.test(trimmed) || name === "time") {
    const dates = tail.match(/\d{4}-\d{2}-\d{2}/g);
    if (dates && dates.length >= 2) {
      return `${name} [${dates[0]}, …, ${dates[dates.length - 1]}]`;
    }
  }

  // Numbers (floats)
  const nums = tail.match(/-?\d+(?:\.\d+)?/g);
  if (nums && nums.length >= 2) {
    const first = nums[0];
    const last = nums[nums.length - 1];
    return `${name} [${first}, …, ${last}]`;
  }

  return `${name} [–, …, –]`;
}

function parseVariableRange(varLine) {
  // Example:
  // t2m (time, latitude, longitude) float64 51kB 258.4 258.4 ... 282.8
  // Use everything AFTER the byte unit (kB/MB/GB/B)
  const lower = varLine.toLowerCase();
  const idx = lower.lastIndexOf("b ");
  const tail = idx !== -1 ? varLine.slice(idx + 2).trim() : varLine;

  const nums = tail.match(/-?\d+(?:\.\d+)?/g);
  if (nums && nums.length >= 2) {
    return `[${nums[0]} ... ${nums[nums.length - 1]}]`;
  }
  return null;
}

export default function XarrayViewer({ raw }) {
  if (!raw) return <div className="no_content">No Content</div>;
  const { size, dimNamesLine, dimValuesLine, coords, variableRange } = parseXarrayString(raw);

  return (
    <div className="xarray_container">
      <h3>Xarray Dataset</h3>
      <p><strong>Size:</strong> {size}</p>

      <p><strong>Dimensions:</strong></p>
      <div>
        {dimNamesLine}
        <br />
        {dimValuesLine}
      </div>

      <p><strong>Coordinate Ranges:</strong></p>
      <ul>
        {coords.map((c, i) => <li key={i}>{c}</li>)}
      </ul>

      {variableRange && (
        <p><strong>Selected Variable Range:</strong> {variableRange}</p>
      )}
    </div>
  );
}




// import React from "react";


// function parseXarrayString(raw) {
//   const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);

//   const sizeLine = lines.find(l => l.includes("Size:"));
//   const dimensions = lines.find(l => l.startsWith("Dimensions:"));
//   const coordinates = lines.filter(l => l.startsWith("*"));
//   const variableLine = lines.find(l => l.includes("t2m"));
//   const attributes = lines.filter(l => l.startsWith("history") || l.startsWith("Conventions"));

//   return {
//     size: sizeLine?.replace("<xarray.Dataset>", "Xarray Dataset"),
//     dimensions,
//     coordinates,
//     variableLine,
//     attributes
//   };
// }

// function XarrayViewer({ raw }) {
//   if (!raw) return <div className="no_content">No Content</div>;

//   const parsed = parseXarrayString(raw);

//   return (
//     <div className="xarray_container">
//       <h3>{parsed.size}</h3>
//       <p><strong>Dimensions:</strong></p>
//       <pre>{parsed.dimensions}</pre>

//       <p><strong>Coordinate Ranges:</strong></p>
//       <ul>
//         {parsed.coordinates.map((c, i) => (
//           <li key={i}>{c}</li>
//         ))}
//       </ul>

//       <p><strong>Selected Variable Range:</strong></p>
//       <pre>{parsed.variableLine}</pre>

//       {parsed.attributes?.length > 0 && (
//         <>
//           <p><strong>Attributes:</strong></p>
//           <ul>
//             {parsed.attributes.map((a, i) => <li key={i}>{a}</li>)}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }

// export default XarrayViewer