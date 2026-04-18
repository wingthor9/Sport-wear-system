import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
export const locationService = {

  async getProvinces(options?: Prisma.ProvinceFindManyArgs) {
    const provinces = await prisma.province.findMany({ ...options })
    return provinces
  },

  // GET DISTRICT BY PROVINCE
  async getDistrictsByProvince(province_id: string) {
    return prisma.district.findMany({
      where: { province_id },
      include: { province: true }
    })
  },

  // GET BRANCH BY DISTRICT
  async getBranchesByDistrict(district_id: string) {
    return prisma.branch.findMany({
      where: { district_id },
      include: { district: true }
    })
  },

  // GET PROVINCE
  async getProvince(id: string) {
    return prisma.province.findUnique({
      where: { province_id: id }
    })
  },

  // GET DISTRICT
  async getDistrict(id: string) {
    return prisma.district.findUnique({
      where: { district_id: id },
      include: { province: true }
    })
  },

  // GET BRANCH
  async getBranch(id: string) {
    return prisma.branch.findUnique({
      where: { branch_id: id },
      include: { district: true }
    })
  },




  async createProvince(data: { name: string }) {
    return prisma.province.create({ data })
  },

  async createDistrict(data: { name: string, province_id: string }) {
    return prisma.district.create({ data })
  },

  async createBranch(data: { name: string, district_id: string }) {
    return prisma.branch.create({ data })
  },




  async deleteProvince(id: string) {
    return prisma.province.delete({ where: { province_id: id } })
  },

  async deleteDistrict(id: string) {
    return prisma.district.delete({ where: { district_id: id } })
  },

  async deleteBranch(id: string) {
    return prisma.branch.delete({ where: { branch_id: id } })
  },




  async updateProvince(id: string, data: { province_name: string }) {
    return prisma.province.update({ where: { province_id: id }, data })
  },

  async updateDistrict(id: string, data: { district_name: string }) {
    return prisma.district.update({ where: { district_id: id }, data })
  },

  async updateBranch(id: string, data: { branch_name: string }) {
    return prisma.branch.update({ where: { branch_id: id }, data })
  },



}