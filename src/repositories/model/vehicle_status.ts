import {Vehicle} from './vehicle';
import {VehicleSummary} from './vehicle_summary';

export interface VehicleStatus {
  vehicle: Vehicle;
  summary: VehicleSummary;
  tessera: Vehicle;

}
