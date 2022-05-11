import { IonSearchbar } from "@ionic/react";
import React, { useState } from "react";
import { transFn } from "./Trans";

export default () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div style={{ width: "100%",position:'fixed',top:'-10px',zIndex:10 }}>
      <IonSearchbar
        data-tut="searchSection"
        value={searchText}
        className="searchInput"
        placeholder={transFn('Search in Satrex ...')}
        onIonChange={(e) => setSearchText(e.detail.value!)}
      />
    </div>
  );
};
