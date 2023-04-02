import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Role } from '/configs/roles.config';
import DepartmentCreateDto from '/department/dto/department-create.dto';
import DepartmentUpdateDto from '/department/dto/department-update.dto';
import { PrismaService } from '/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  private async updateRoleOnUser(personId: number, role: Role): Promise<void> {
    const person = await this.prisma.person.findUnique({
      where: { id: personId },
    });
    if (person && !person.roles.includes(role)) {
      await this.prisma.person.update({
        where: { id: personId },
        data: {
          roles: person.roles.concat(role),
        },
      });
    }
  }

  private async updateRoleOfMembersInDepartment(
    members: number[],
  ): Promise<void> {
    for (const memberId of members) {
      await this.updateRoleOnUser(memberId, Role.COOPERATOR);
    }
  }

  private async updateRoleOfLeaderInDepartment(
    leaderId: number,
  ): Promise<void> {
    await this.updateRoleOnUser(leaderId, Role.LEADER);
  }

  async create(data: DepartmentCreateDto) {
    const { members, leaderId, churchId, ...department } = data;
    const departmentCreated = await this.prisma.department.create({
      data: {
        ...department,
        leader: {
          connect: {
            id: leaderId,
          },
        },
        church: {
          connect: {
            id: churchId,
          },
        },
      },
    });

    this.updateRoleOfLeaderInDepartment(leaderId).then(() =>
      console.log('inserted role on leader'),
    );

    await this.prisma.department.update({
      data: {
        members: {
          connectOrCreate: members.map((memberId) => ({
            create: {
              memberId,
            },
            where: {
              memberId_departmentId: {
                departmentId: departmentCreated.id,
                memberId,
              },
            },
          })),
        },
      },
      where: {
        id: departmentCreated.id,
      },
    });

    this.updateRoleOfMembersInDepartment(members).then(() => {
      console.log('inserted role on members');
    });

    return departmentCreated;
  }

  findAll() {
    return this.prisma.department.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({ where: { id } });
  }

  async findMembersOfDepartment(id: number) {
    const members = await this.prisma.department.findUnique({
      where: { id },
      select: {
        members: {
          select: {
            member: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (members.members.length > 0) {
      return members.members.map((member) => member.member.id);
    }

    return [];
  }

  async update(id: number, data: DepartmentUpdateDto) {
    const { members, leaderId, churchId, name, description } = data;
    const found = await this.prisma.department.findUnique({
      where: { id },
      include: { members: true },
    });
    if (!found) {
      throw new HttpException(
        `Departamento não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    for (const member of found.members) {
      if (!members.includes(member.memberId)) {
        await this.prisma.membersOnDepartments.delete({
          where: {
            memberId_departmentId: {
              departmentId: id,
              memberId: member.memberId,
            },
          },
        });
      }
    }

    const departmentUpdated = this.prisma.department.update({
      data: {
        name: name || found.name,
        description: description || found.description,
        leader: {
          connect: {
            id: leaderId || found.leaderId,
          },
        },
        church: {
          connect: {
            id: churchId || found.churchId,
          },
        },
        members: {
          connectOrCreate: members.map((member) => ({
            create: {
              memberId: member,
            },
            where: {
              memberId_departmentId: {
                departmentId: id,
                memberId: member,
              },
            },
          })),
        },
      },
      where: { id },
    });

    this.updateRoleOfLeaderInDepartment(leaderId).then(() => {
      console.log('updated role on leader');
    });

    this.updateRoleOfMembersInDepartment(members).then(() => {
      console.log('updated role on members');
    });

    return departmentUpdated;
  }

  findDepartmentsWhereImNotIncluded(personId: number) {
    return this.prisma.department.findMany({
      where: {
        NOT: {
          leaderId: personId,
        },
        members: {
          none: {
            memberId: personId,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.department.delete({ where: { id } });
  }
}
