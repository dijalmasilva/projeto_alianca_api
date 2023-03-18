import { SetMetadata } from '@nestjs/common';

import { Role } from '/configs/roles.config';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
