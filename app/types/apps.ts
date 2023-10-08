type Zoom = {
    zoomLink: string;
    zoomId: string;
    zoomPassword: string;
};

type GoogleMeet = {
    googleMeetLink: string;
};

type Apps = {
    zoom?: Zoom;
    zoomEnabled: boolean;

    googleMeet?: GoogleMeet;
    googleMeetEnabled: boolean;
};
export default Apps;