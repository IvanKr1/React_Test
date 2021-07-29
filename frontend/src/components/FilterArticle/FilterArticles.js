import React from "react";
import RegionDropdown from "../RegionDropdown/RegionDropdown";

const FilterArticles = ({getRegions}) => {

  return (
    <div style={{ marginLeft: "2.5rem" }}>
      <label style={{ fontWeight: "600" }}>Filter By Regions</label>
      <RegionDropdown
        width="37rem"
        onChange={(regions) => getRegions(regions)}
      />
    </div>
  );
};

export default FilterArticles;
