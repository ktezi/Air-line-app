export class Passengers {
    id: string;
    flightId: string;
    name: string;
    dob: string;
    address: string;
    passport: string;
    seatId: string;
    specialMeal: string;
    infant: boolean;
    wheelChair: boolean;
    item: Array<{
      }>;
    ancillaryServices: {
        meal: string;
        baggage: string;
        gadgets: any;
    };
    ischeckedIn: boolean
}
