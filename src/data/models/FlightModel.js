import AncillaryModel from './AncillaryModel';
import PassengerModel from './PassengerModel';
export default{
    id: number,
    name: string,
    departure: string,
    arrival: string,
    seats: number,
    ancillary: AncillaryModel,
    passengers: PassengerModel
}