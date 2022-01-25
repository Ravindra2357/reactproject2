import PassportModel from './PassportModel'
import AncillaryModel from './AncillaryModel'
export default
{
    id: number,
    name: string,
    mailId: string,
    phoneNo: number,
    seatNo: number,
    dob: string,
    isCheckedIn: boolean,
    ancillary: AncillaryModel,
    passportDetails: PassportModel
}