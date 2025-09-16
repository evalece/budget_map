export interface Place{

  displayName: string,
  id:string,
  formattedAddress: string,
  location: {
    latitude: number;
    longitude: number;
  };
  priceLevel: string;

}
