import { Address } from "../models/Address";

export const getAddressesForUser = async (userId: string) => {
  return await Address.find({ userId });
};

export const addAddressForUser = async (userId: string, data: any) => {
  if (data.isDefault) {
    await Address.updateMany({ userId }, { isDefault: false });
  }
  return await Address.create({ ...data, userId });
};

export const updateAddressForUser = async (userId: string, addressId: string, data: any) => {
  if (data.isDefault) {
    await Address.updateMany({ userId }, { isDefault: false });
  }

  const address = await Address.findOneAndUpdate(
    { _id: addressId, userId },
    data,
    { new: true }
  );

  if (!address) throw new Error("Address not found");
  return address;
};

export const deleteAddressForUser = async (userId: string, addressId: string) => {
  const address = await Address.findOneAndDelete({ _id: addressId, userId });
  if (!address) throw new Error("Address not found");
  return address;
};

export const setDefaultAddressForUser = async (userId: string, addressId: string) => {
  await Address.updateMany({ userId }, { isDefault: false });
  
  const address = await Address.findOneAndUpdate(
    { _id: addressId, userId },
    { isDefault: true },
    { new: true }
  );

  if (!address) throw new Error("Address not found");
  return address;
};
