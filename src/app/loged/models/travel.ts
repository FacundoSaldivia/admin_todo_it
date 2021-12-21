import { dto } from './dto';
export interface Viaje {
  id: number;
  lastStatusTravel: number;
  travelEquipmentDTOs: dto[];
  creationDate: string;
}
