import { ReactElement } from 'react';

export interface SatrexDialogProps {
  content: any,
  open:boolean,
  handleClose?: ()=>void,
  otherProps?:unknown,
}

export interface SuspendDialogProps {
  open:boolean,
  handleClose: ()=>void,
}

export interface userReducerActionType{
  type:string,
  payload:any,
}

export interface ProgressViewTypes{
  views : ReactElement[],
  steps : string[],
  handleChangeIndex : (index:number)=>void,
  onSwitching ?: (index:number)=>void,
  slide : number,
  activeStep : number,
}

export interface ProgressViewPropsTypes{
  handleChangeIndex:(cb: (value: number) => number)=>void,
  setMaxAllowedStep:(cb: (value: number) => number)=>void,
  setStopStep?:(value:number)=>void,
}

export interface walletDetailType{
  assetEnglishTitle: string,
  assetImageAddress: string,
  assetPersianTitle:string,
  averageBuyPrice: number,
  changeForLastIn24HoursInPercent: number,
  price: number,
  totalBlockChainReceivedBalance: number,
  totalFund: number,
  totalFundPriceInTether:number,
  totalFundPriceInToman: number,
  totalInternalReceivedBalance: number,
  totalTradable: number,
  totalTradablePriceInTether: number,
  totalTradablePriceInToman: number,
}
export interface appContextType{
  language: string,
  back: {
    status: boolean,
    page: string,
  },
  marketDeal?:null,
}

export type appContextStateType = [
  globState : appContextType,
  setGlobState : (state:appContextType)=>void
]

export interface bankAccountRowType {
  cardNumber: string,
  iban: string,
  id: string,
  notSent: true,
  lastConfirmationType: string,
}

export interface layoutStatesTypes{
  language: string,
  redirectUrls: any[],
  theme: boolean,
  tourGuideReady: boolean,
}

export interface LayoutState {
  layout: layoutStatesTypes
}

export interface actionType{
  type:string,
  payload?:any,
}
export interface SatrexFullScreenDialogProps{
  title:string,
  children: ReactElement,
}

export interface apiOptions{
  showSuccess:string,
  showErrors:boolean,
  returnData:boolean
}

export interface apiBasicParam{
  url:string,
  params?:any
}

export interface chatPageProps{
  messageId: string | number,
}

export interface messageDetailsTypes{
  startTicket: {
    id:string | number,
    createdAtUtc:string,
    title:string,
    message:string,
    priority:string,
  },
  department:{
    title:string,
  },
  replies:{
    writer:string,
    message:string,
    createdAtUtc:string,
    writtenByUser:boolean,
  }[],
}

export interface useSatrexDialogReturnType{
  open:boolean,
  setOpen:(cb: ((value: boolean) => boolean) | boolean)=>void,
  handleClose:()=>void,
}
