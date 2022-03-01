import { IMarkerArea, IMarkerMob, IMarkerResource } from "./marker";

export interface IMap {
    id: string;
    name: string;
    image: string;
    areas?: IMap[];
    markers?: IMarkerArea[] | IMarkerResource[] | IMarkerMob[];
    isOpen?: boolean;
}