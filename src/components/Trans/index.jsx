import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Store } from "../../redux/store";
import fa from "./fa";
import en from "./en";
import ar from "./ar";
import fr from "./fr";
import gr from "./gr";

const Translate = (props) => {
  // const lang = useSelector((state) => state.user.language);
  const lang = Store.getState().layout.language;

  const langs = {
    FA: fa(props.children),
    EN: en(props.children),
    // ar: ar(props.children),
    // fr: fr(props.children),
    // gr: gr(props.children),
  };

  const trans = () => {
    if (langs[lang]) return langs[lang];
    return props.children;
  };

  return <>{trans()}</>;
};

export default Translate;

export const transFn = (word) => {
  // const lang = Store.getState().user.language;
  const lang = Store.getState().layout.language;
  const langs = {
    FA: fa(word),
    EN: en(word),
    ar: ar(word),
    fr: fr(word),
    gr: gr(word),
  };
  if (langs[lang]) return langs[lang];
  return word;
};
export const supportedLanguages = ["FA", "EN"];

