import React from "react";
import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { RefresherEventDetail } from "@ionic/core";
import { useQueryClient } from "react-query";

interface RefresherProps {
  queries: string[];
}


const Refresher: React.FC<RefresherProps> = ({queries}) => {


  const queryClient = useQueryClient()


  const refreshApis = async(event :  CustomEvent<RefresherEventDetail>,msg: string[])=> {

    for (const query of queries) {
      await  queryClient.invalidateQueries(query)

    }
    event.detail.complete();
  }

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={(e)=>refreshApis(e,['hiii'])} pullFactor={2} pullMin={300}>
        <IonRefresherContent/>
      </IonRefresher>
    </>
  );
};

export default Refresher;