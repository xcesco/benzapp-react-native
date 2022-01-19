export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Lock: undefined;
  Main: undefined;
  VehicleList: undefined;
  VehicleDetail: { id: number };
  VehicleQRCodeDetail: { id:number };
  RefuelingList: { targa:string } | undefined;
  RefuelingDetail: { id:number };
};
