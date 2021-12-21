export interface dto {
  id: number;
  operationDate: string;
  observation: string;
  statusTravel: number;
  cadete: {
    id: number;
    fullName: string;
  };
  equipment: {
    id: number;
    mark: string;
    model: string;
    cliente: {
      fullName: string;
      address: string;
      cellPhone: string;
    };
  };
}
