import { ROLE } from 'src/constants/role.constants';

export type PersonCreateDto = {
  name: string;
  birthday: string;
  phoneNumber: string;
  picture?: string;
  hasAlliance?: string;
  roles?: ROLE[];
};
