import { ISize } from "./size";
import { IXY } from "./xy";

export interface IMarker {
    name?: string;
    size: ISize;
    position: IXY;
}

export interface IMarkerArea extends IMarker {
    areaId: string;
}

export interface IMarkerResource extends IMarker {
    type: 'ore' | 'energy' | 'herb' | 'darkSteel' | 'chest';
    rarity: 'gray' | 'green' | 'blue' | 'red' | 'yellow'
}

export interface IMarkerMob extends IMarker {
    type: 'common' | 'elite' | 'unique' | 'boss';
    image: string;
}