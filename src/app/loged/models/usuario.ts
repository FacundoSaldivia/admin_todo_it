export interface Usuario {
  id?: number;
  email: string;
  fullName: string;
  cellPhone: string;
  address: string;
  isAccepted?: boolean;
  isDeleted?: boolean;
  observations?: string;
  password: string;
  vehicle?: Vehicle;
  rol?: Rol;
}

interface Rol {
  id: number;
  name: string;
  isDeleted?: number;
}
interface Vehicle {
  id: number;
  name: string;
  isDeleted: number;
}
